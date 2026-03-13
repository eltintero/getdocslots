import { AbsoluteFill, Img, staticFile } from "remotion";

const NAVY = "#0E2137";
const TEAL = "#148073";
const TEAL_LIGHT = "#1A9B8A";

export const OgImage: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: NAVY,
        fontFamily: "'Fraunces', Georgia, serif",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: "60%",
          height: "140%",
          background:
            "radial-gradient(ellipse, rgba(20,128,115,0.12) 0%, transparent 65%)",
        }}
      />

      {/* Left side: text */}
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 0,
          bottom: 0,
          width: 520,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.04em",
            marginBottom: 28,
          }}
        >
          DocSlots
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            marginBottom: 20,
          }}
        >
          Stop losing track of who's in which room.
        </div>

        {/* Subline */}
        <div
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 17,
            color: "rgba(181,212,228,0.6)",
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          Simple room scheduling for medical offices that rent consulting rooms.
        </div>

        {/* Proof points */}
        <div
          style={{
            display: "flex",
            gap: 20,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              background: "rgba(20,128,115,0.15)",
              color: TEAL_LIGHT,
              borderRadius: 8,
            }}
          >
            No per-seat pricing
          </div>
          <div
            style={{
              padding: "8px 16px",
              background: "rgba(20,128,115,0.15)",
              color: TEAL_LIGHT,
              borderRadius: 8,
            }}
          >
            Live in 48 hours
          </div>
        </div>
      </div>

      {/* Right side: screenshot */}
      <div
        style={{
          position: "absolute",
          right: -20,
          top: 50,
          width: 640,
          height: 530,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
          transform: "perspective(1000px) rotateY(-4deg) rotateX(2deg)",
        }}
      >
        <Img
          src={staticFile("screenshots/agenda-cropped.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 72,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 14,
          color: "rgba(181,212,228,0.35)",
        }}
      >
        getdocslots.com
      </div>
    </AbsoluteFill>
  );
};
