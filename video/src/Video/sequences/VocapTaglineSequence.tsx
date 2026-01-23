import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const VocapTaglineSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main tagline words
  const words = ["Transcribe", "tu", "audio"];

  // Price highlight
  const priceText = "desde 1\u20ac/hora";

  // Word animations
  const getWordProgress = (index: number) => {
    return spring({
      frame: frame - index * 5,
      fps,
      config: { damping: 200 },
    });
  };

  // Price animation
  const priceProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Subtext
  const subtextProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 200 },
  });

  // Exit
  const exitProgress = spring({
    frame: frame - 70,
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
          gap: 24,
        }}
      >
        {/* Main tagline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {words.map((word, index) => {
            const progress = getWordProgress(index);
            return (
              <span
                key={index}
                style={{
                  fontSize: 80,
                  fontWeight: 700,
                  color: "#fff",
                  opacity: interpolate(progress, [0, 1], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(progress, [0, 1], [50, 0], {
                    extrapolateRight: "clamp",
                  })}px)`,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Price highlight */}
        <div
          style={{
            position: "relative",
            transform: `scale(${interpolate(priceProgress, [0, 1], [0.5, 1], {
              extrapolateRight: "clamp",
            })})`,
            opacity: interpolate(priceProgress, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {/* Glow behind */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <span
            style={{
              fontSize: 100,
              fontWeight: 800,
              background: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Inter, sans-serif",
              position: "relative",
            }}
          >
            {priceText}
          </span>
        </div>

        {/* Subtext */}
        <div
          style={{
            opacity: interpolate(subtextProgress, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(subtextProgress, [0, 1], [20, 0], {
              extrapolateRight: "clamp",
            })}px)`,
            marginTop: 20,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Audio a texto con IA en minutos
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
