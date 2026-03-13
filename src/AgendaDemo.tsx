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

export const AgendaDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase 1 (0-60): Zoom from overview to focus area
  const scale = interpolate(frame, [0, 60, 120, 160], [1, 1.35, 1.35, 1], {
    extrapolateRight: "clamp",
  });

  // Pan to appointment area
  const translateX = interpolate(
    frame,
    [0, 60, 120, 160],
    [0, -80, -80, 0],
    { extrapolateRight: "clamp" }
  );
  const translateY = interpolate(
    frame,
    [0, 60, 120, 160],
    [0, -60, -60, 0],
    { extrapolateRight: "clamp" }
  );

  // Cursor appears and clicks on appointment (frame 70-100)
  const cursorOpacity = interpolate(frame, [50, 60, 100, 110], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorX = interpolate(frame, [50, 70], [400, 520], {
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [50, 70], [500, 380], {
    extrapolateRight: "clamp",
  });

  // Click ripple effect
  const clickSpring = spring({ frame: frame - 75, fps, durationInFrames: 20 });
  const rippleScale = frame >= 75 ? interpolate(clickSpring, [0, 1], [0, 1.5]) : 0;
  const rippleOpacity = frame >= 75 ? interpolate(clickSpring, [0, 1], [0.5, 0]) : 0;

  // Tooltip/panel slide-in (frame 80-120)
  const panelSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const panelX = frame >= 85 ? interpolate(panelSpring, [0, 1], [200, 0]) : 200;
  const panelOpacity = frame >= 85 ? interpolate(panelSpring, [0, 1], [0, 1]) : 0;

  // Panel fade out
  const panelFadeOut = interpolate(frame, [130, 145], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F3F5F9",
        overflow: "hidden",
      }}
    >
      {/* Screenshot with pan/zoom */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("screenshots/agenda-cropped.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </div>

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity,
          transform: `scale(${scale})`,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {/* Click ripple */}
        <div
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `2px solid ${TEAL}`,
            transform: `scale(${rippleScale}) translate(-50%, -50%)`,
            opacity: rippleOpacity,
          }}
        />
        {/* Cursor arrow */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={NAVY}
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
        >
          <path d="M5 3l14 9-7 2-4 7z" />
        </svg>
      </div>

      {/* Appointment detail panel */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 120,
          width: 280,
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 8px 40px rgba(10,22,40,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
          padding: 24,
          transform: `translateX(${panelX}px)`,
          opacity: panelOpacity * panelFadeOut,
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            background: TEAL,
            marginBottom: 16,
          }}
        />
        <div
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 18,
            fontWeight: 700,
            color: NAVY,
            marginBottom: 8,
          }}
        >
          Dr. John Smith
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#6B7F91",
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          Patient: Sarah Bae
          <br />
          Room: Consultorio 3
          <br />
          Time: 16:00 – 16:55
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              background: TEAL,
              color: "#fff",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Edit
          </div>
          <div
            style={{
              padding: "8px 16px",
              background: "#F3F5F9",
              color: "#3D5165",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
