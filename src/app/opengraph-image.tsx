import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Egostix Media — Where Imagination Meets Intelligence";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          border: "16px solid #1d4ed8",
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#1d4ed8",
                borderRadius: "4px",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.5px",
              }}
            >
              Egostix Media
            </span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: "9999px",
              backgroundColor: "#dbeafe",
              color: "#1d4ed8",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            AI-Native Software Studio
          </div>
        </div>

        {/* Center Main Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Where Imagination Meets Intelligence.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#475569",
              lineHeight: 1.4,
              maxWidth: "960px",
            }}
          >
            We engineer high-converting AI business websites, custom internal tools,
            creator platforms, and enterprise workflow automations.
          </div>
        </div>

        {/* Bottom Coordinates & Tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e2e8f0",
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#1d4ed8",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            media.egostix.com
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#64748b",
            }}
          >
            Egostix Engineering Pvt. Ltd. (2026)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

