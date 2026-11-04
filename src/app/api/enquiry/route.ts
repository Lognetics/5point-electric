import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { enquirySchema, TYPE_LABELS, type Enquiry } from "@/lib/enquiry";

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 2_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Per-instance, so best effort on serverless hosts. Turnstile is the stronger control.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function fail(message: string, status: number, fieldErrors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, fieldErrors }, { status });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function passesTurnstile(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(e: Enquiry): [string, string][] {
  return [
    ["Enquiry type", TYPE_LABELS[e.type]],
    ["Full name", e.fullName],
    ["Company / organization", e.company],
    ["Email", e.email],
    ["Phone", e.phone],
    ["Service of interest", e.service],
    ["Product", e.product],
    ["Project location", e.location],
    ["Message", e.message],
  ].filter(([, v]) => v) as [string, string][];
}

async function deliver(e: Enquiry): Promise<boolean> {
  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    if (process.env.NODE_ENV === "production") {
      console.error("Enquiry not delivered: email delivery is not configured.");
      return false;
    }
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, "enquiries.ndjson"),
      JSON.stringify({ receivedAt: new Date().toISOString(), ...e }) + "\n",
    );
    return true;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: ENQUIRY_FROM_EMAIL,
      to: [ENQUIRY_TO_EMAIL],
      reply_to: e.email,
      subject: `${TYPE_LABELS[e.type]}: ${e.product || e.service} (${e.fullName})`,
      text: rows(e).map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table cellpadding="6">${rows(e)
        .map(([k, v]) => `<tr><th align="left" valign="top">${escapeHtml(k)}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
        .join("")}</table>`,
    }),
  });
  if (!res.ok) console.error("Enquiry delivery failed with status", res.status);
  return res.ok;
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail("This request could not be verified.", 403);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail("Your message is too long.", 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("This request could not be read.", 400);
  }

  // Bots that fill the hidden field get a normal-looking response and nothing is sent.
  if (body.website) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail("Too many enquiries. Please try again in a few minutes.", 429);

  const startedAt = Number(body.startedAt);
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return fail("That was very quick. Please wait a moment and send again.", 400);
  }

  if (!(await passesTurnstile(body.turnstileToken, ip))) {
    return fail("Please complete the spam check and try again.", 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.code === "invalid_type" ? "This field is required." : issue.message;
    }
    return fail("Please check the highlighted fields.", 422, fieldErrors);
  }

  const delivered = await deliver(parsed.data).catch((error) => {
    console.error("Enquiry delivery error", error);
    return false;
  });
  if (!delivered) {
    return fail("We couldn't send your enquiry just now. Please try again shortly.", 503);
  }
  return NextResponse.json({ ok: true });
}
