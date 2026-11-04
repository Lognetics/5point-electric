import { ImageResponse } from "next/og";

export const alt = "5Point Electric Technology: Powering the Future of Mobility and Clean Energy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#101D2C", color: "#fff", padding: 72, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 700 }}>
        <div style={{ width: 22, height: 22, borderRadius: 99, background: "#35B96B" }} />
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
