"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/taxonomy";
import { ArrowRoll } from "./Cta";

type Props = {
  type?: "contact" | "quote" | "product";
  product?: string;
  defaultService?: string;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {!required && <span className="font-normal text-stone"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#B42D24]">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({
  type = "contact",
  product = "",
  defaultService = "",
  submitLabel = "Send Enquiry",
  messageLabel = "Message",
  messagePlaceholder,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [service, setService] = useState(defaultService);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Links such as "Discuss Your Project" preselect the relevant service.
    const fromUrl = new URLSearchParams(window.location.search).get("service");
    if (fromUrl && (SERVICES as readonly string[]).includes(fromUrl)) setService(fromUrl);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setFormError("");
    setErrors({});

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type,
          product,
          startedAt: startedAt.current,
          turnstileToken: data["cf-turnstile-response"],
        }),
      });
      const result = (await res.json()) as {
        ok: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };
      if (result.ok) {
        setStatus("sent");
        form.reset();
        setTimeout(() => statusRef.current?.focus(), 0);
        return;
      }
      setErrors(result.fieldErrors ?? {});
      setFormError(result.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[14px] bg-ink p-8 text-white outline-none lg:p-12">
        <CheckCircle2 className="text-leaf" size={36} strokeWidth={1.5} aria-hidden="true" />
        <h3 className="d-3 mt-5">Thank you. We've received your enquiry.</h3>
        <p className="mt-3 text-white/70">Our team will review the details and get back to you.</p>
        <button
          type="button"
          className="link-arrow mt-6"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const describe = (name: string) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {};

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <Field id="fullName" label="Full Name" required error={errors.fullName}>
        <input id="fullName" name="fullName" required autoComplete="name" maxLength={120} className="field" {...describe("fullName")} />
      </Field>
      <Field id="company" label="Company / Organization" error={errors.company}>
        <input id="company" name="company" autoComplete="organization" maxLength={160} className="field" {...describe("company")} />
      </Field>
      <Field id="email" label="Email Address" required error={errors.email}>
        <input id="email" name="email" type="email" required autoComplete="email" maxLength={200} className="field" {...describe("email")} />
      </Field>
      <Field id="phone" label="Phone Number" required error={errors.phone}>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" maxLength={40} className="field" {...describe("phone")} />
      </Field>
      <Field id="service" label="Service of Interest" required error={errors.service}>
        <select
          id="service"
          name="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="field"
          {...describe("service")}
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field id="location" label="Project Location" error={errors.location}>
        <input id="location" name="location" maxLength={160} className="field" {...describe("location")} />
      </Field>
      <div className="sm:col-span-2">
        <Field id="message" label={messageLabel} required error={errors.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={5000}
            placeholder={messagePlaceholder}
            className="field"
            {...describe("message")}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="sm:col-span-2">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2">
        {formError && (
          <p role="alert" className="rounded-lg bg-[#FBEEED] px-4 py-3 text-[0.775rem] text-[#8F231C]">
            {formError}
          </p>
        )}
        <div>
          <button type="submit" disabled={status === "sending"} className="btn btn-ink w-full disabled:opacity-60 sm:w-auto sm:min-w-56">
            {status === "sending" ? "Sending..." : submitLabel}
            <ArrowRoll />
          </button>
        </div>
      </div>
    </form>
  );
}
