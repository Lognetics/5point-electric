import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

// Starts GitHub sign-in for the CMS at /admin. See README, "Connecting the CMS".
export async function GET(request: Request) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) return new NextResponse("CMS sign-in is not configured.", { status: 503 });

  const state = randomBytes(24).toString("hex");
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("scope", "repo");
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("redirect_uri", new URL("/api/cms/callback", request.url).toString());

  const response = NextResponse.redirect(authorize);
  response.cookies.set("cms_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/cms",
    maxAge: 600,
  });
  return response;
}
