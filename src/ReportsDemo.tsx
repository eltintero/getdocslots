import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const TEAL = "#148073";
const NAVY = "#0E2137";

export const ReportsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom into the report data
  const scale = interpolate(frame, [0, 90, 140, 180], [1, 1.25, 1.25, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 90, 140, 180], [0, -40, -40, 0], {
    extrapolateRight: "clamp",
  });

  // Highlight the total row (frame 40-120)
  const highlightSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 18, stiffness: 100 },
  });
  const highlightOpacity =
    frame >= 45
      ? interpolate(
          frame,
          [45, 55, 120, 135],
          [0, 0.15, 0.15, 0],
          { extrapolateRight: "clamp" }
        )
      : 0;

  // Counter animation for the "$600" callout
  const counterSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const counterOpacity = frame >= 60
    ? interpolate(frame, [60, 70, 125, 140], [0, 1, 1, 0], {
        extrapolateRight: "clamp",
      })
    : 0;
  const counterY = frame >= 60 ? interpolate(counterSpring, [0, 1], [20, 0]) : 20;
  const counterValue = frame >= 60 ? Math.round(interpolate(counterSpring, [0, 1], [0, 600])) : 0;

  // PDF export button highlight
  const pdfPulse = interpolate(frame, [100, 115, 130], [1, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pdfGlow = interpolate(frame, [100, 115, 130], [0, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F5F9", overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("screenshots/reportes-cropped.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </div>

      {/* Highlight overlay on total row area */}
      <div
        style={{
          position: "absolute",
          left: "5%",
          right: "5%",
          top: "58%",
          height: 60,
          background: TEAL,
          borderRadius: 8,
          opacity: highlightOpacity,
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      />

      {/* Total callout badge */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 80,
          background: NAVY,
          borderRadius: 14,
          padding: "20px 28px",
          opacity: counterOpacity,
          transform: `translateY(${counterY}px)`,
          boxShadow: "0 8px 32px rgba(10,22,40,0.2)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(181,212,228,0.5)",
            marginBottom: 4,
          }}
        >
          Total Due
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 36,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
          }}
        >
          ${counterValue}
        </div>
      </div>

      {/* PDF export highlight */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 180,
          transform: `scale(${pdfPulse})`,
          opacity: counterOpacity * 0.9,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 600,
            color: NAVY,
            boxShadow: `0 4px 16px rgba(10,22,40,0.08), 0 0 0 ${pdfGlow > 0 ? 2 : 0}px ${TEAL}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={TEAL}
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export PDF
        </div>
      </div>
    </AbsoluteFill>
  );
};
