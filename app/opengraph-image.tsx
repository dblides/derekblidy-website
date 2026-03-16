import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Derek Blidy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Yellow accent blob */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(250,204,21,0.12)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 24,
          }}
        >
          {/* Logo mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#FACC15",
              }}
            />
            <span
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-1px",
              }}
            >
              Derek Blidy
            </span>
          </div>
          {/* Tagline */}
          <span style={{ fontSize: 28, color: "#6b7280", maxWidth: 640 }}>
            Personal site — photos, life updates & what I&apos;m into.
          </span>
          {/* Yellow underline accent */}
          <div
            style={{
              width: 80,
              height: 6,
              borderRadius: 4,
              background: "#FACC15",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
