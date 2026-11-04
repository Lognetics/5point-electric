import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Completes GitHub sign-in by passing the token back to the CMS window that opened this popup.
function page(status: "success" | "error", payload: object, origin: string) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const script = `
    (function () {
      var origin = ${JSON.stringify(origin).replace(/</g, "\\u003c")};
      var message = ${JSON.stringify(message).replace(/</g, "\\u003c")};
      function receive(event) {
        if (event.origin !== origin) return;
        window.removeEventListener("message", receive);
        window.opener.postMessage(message, origin);
        window.close();
      }
      window.addEventListener("message", receive);
      window.opener.postMessage("authorizing:github", origin);
    })();`;
  return new NextResponse(`<!doctype html><title>Signing in</title><script>${script}</script>`, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;
  const jar = await cookies();
  const expected = jar.get("cms_oauth_state")?.value;
  jar.delete("cms_oauth_state");

  const code = url.searchParams.get("code");
  if (!code || !expected || url.searchParams.get("state") !== expected) {
    return page("error", { message: "Sign-in could not be verified." }, origin);
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) return page("error", { message: "GitHub sign-in failed." }, origin);
  return page("success", { token: data.access_token }, origin);
}
