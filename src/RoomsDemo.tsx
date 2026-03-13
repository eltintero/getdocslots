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

export const RoomsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle zoom into the room cards
  const scale = interpolate(frame, [0, 70, 110, 150], [1, 1.2, 1.2, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 70, 110, 150], [0, -30, -30, 0], {
    extrapolateRight: "clamp",
  });

  // Room card highlights - staggered
  const rooms = [
    { name: "Consultorio 1", rate: "$300/hr", y: 72, delay: 20 },
    { name: "Consultorio 2", rate: "$300/hr", y: 122, delay: 30 },
    { name: "Consultorio 3", rate: "$300/hr", y: 172, delay: 40 },
    { name: "Consultorio 4", rate: "$300/hr", y: 222, delay: 50 },
    { name: "Gimnasio", rate: "$0/hr", y: 272, delay: 60 },
  ];

  // Active badge pulse on room 2 (frame 70-110)
  const badgeSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const badgeScale = frame >= 75 ? interpolate(badgeSpring, [0, 1], [0.8, 1]) : 0.8;
  const badgeOpacity = frame >= 75
    ? interpolate(frame, [75, 85, 110, 125], [0, 1, 1, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  // "Add Room" button animation
  const addSpring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const addScale = frame >= 95
    ? interpolate(addSpring, [0, 1], [0.9, 1])
    : 0.9;
  const addOpacity = frame >= 95
    ? interpolate(frame, [95, 105, 130, 140], [0, 1, 1, 0], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F5F9", overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center top",
        }}
      >
        <Img
          src={staticFile("screenshots/consultorios-cropped.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </div>

      {/* Staggered highlight bars on each room */}
      {rooms.map((room, i) => {
        const roomSpring = spring({
          frame: frame - room.delay,
          fps,
          config: { damping: 20, stiffness: 100 },
        });
        const barWidth = frame >= room.delay
          ? interpolate(roomSpring, [0, 1], [0, 100])
          : 0;
        const barOpacity = frame >= room.delay
          ? interpolate(
              frame,
              [room.delay, room.delay + 10, room.delay + 40, room.delay + 55],
              [0, 0.08, 0.08, 0],
              { extrapolateRight: "clamp" }
            )
          : 0;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              top: `${room.y * scale + translateY}px`,
              height: 44,
              background: TEAL,
              borderRadius: 8,
              opacity: barOpacity,
              width: `${barWidth}%`,
              maxWidth: "84%",
              transformOrigin: "left center",
            }}
          />
        );
      })}

      {/* Active status badge callout */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 160,
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "14px 20px",
            boxShadow: "0 6px 24px rgba(10,22,40,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: TEAL,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: NAVY,
            }}
          >
            5 rooms active
          </span>
        </div>
      </div>

      {/* "Add Room" CTA */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 220,
          opacity: addOpacity,
          transform: `scale(${addScale})`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: TEAL,
            borderRadius: 10,
            padding: "10px 20px",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 4px 16px rgba(20,128,115,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Room
        </div>
      </div>
    </AbsoluteFill>
  );
};
