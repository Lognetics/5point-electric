import { ImageResponse } from "next/og";
import { LOGO_BLADES, LOGO_CORE, LOGO_RING } from "@/lib/logo-paths";

export const alt = "5Point Electric Technology: Powering the Future of Mobility and Clean Energy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0A1510", color: "#fff", padding: 72, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 700 }}>
        <svg width="72" height="72" viewBox="-3 -1 104 102">
          <circle cx="50" cy="50" r="49" fill="#fff" />
          <path fill="#3F9152" fillRule="evenodd" d={LOGO_RING} />
          {LOGO_BLADES.map((d) => (
            <path key={d} fill="#3F9152" d={d} />
          ))}
          <path fill="#3F9152" d={LOGO_CORE} />
        </svg>
        5Point Electric Technology
      </div>
      <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
        Powering the Future of Mobility and Clean Energy.
      </div>
      <div style={{ fontSize: 28, opacity: 0.75 }}>Abuja | Lagos | Port Harcourt</div>
    </div>,
    size,
  );
}
