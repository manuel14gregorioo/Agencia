import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const TaglineSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text entrance
  const textEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Word-by-word animation
  const words = ["De", "idea", "a", "sistema", "funcionando"];
  const highlight = "en 2 semanas";

  // Highlight animation (delayed)
  const highlightEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Underline animation
  const underlineWidth = spring({
    frame: frame - 45,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  // Exit animation
  const exitProgress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 200 },
  });

  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Main text */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            maxWidth: 1200,
          }}
        >
          {words.map((word, index) => {
            const wordProgress = spring({
              frame: frame - index * 4,
              fps,
              config: { damping: 200 },
            });

            const opacity = interpolate(wordProgress, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            });

            const y = interpolate(wordProgress, [0, 1], [40, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <span
                key={index}
                style={{
                  fontSize: 80,
                  fontWeight: 700,
                  color: "#fff",
                  opacity,
                  transform: `translateY(${y}px)`,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Highlighted text */}
        <div
          style={{
            position: "relative",
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontSize: 90,
              fontWeight: 800,
              background: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: interpolate(highlightEntrance, [0, 1], [0, 1], {
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(highlightEntrance, [0, 1], [0.8, 1], {
                extrapolateRight: "clamp",
              })})`,
              display: "inline-block",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {highlight}
          </span>

          {/* Animated underline */}
          <div
            style={{
              position: "absolute",
              bottom: -5,
              left: "50%",
              transform: "translateX(-50%)",
              width: `${interpolate(underlineWidth, [0, 1], [0, 100])}%`,
              height: 6,
              background: "linear-gradient(90deg, #10b981 0%, #6366f1 100%)",
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
