import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Audio bars for logo
const AudioBars = ({ frame, fps }: { frame: number; fps: number }) => {
  const bars = [0.6, 1, 0.8, 0.5, 0.9, 0.7];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, height: 60 }}>
      {bars.map((baseHeight, i) => {
        const animatedHeight = interpolate(
          Math.sin(frame * 0.12 + i * 0.8),
          [-1, 1],
          [baseHeight * 30, baseHeight * 60]
        );

        const barEntrance = spring({
          frame: frame - i * 3,
          fps,
          config: { damping: 12 },
        });

        return (
          <div
            key={i}
            style={{
              width: 8,
              height: animatedHeight,
              background: "linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: 4,
              transform: `scaleY(${barEntrance})`,
            }}
          />
        );
      })}
    </div>
  );
};

export const VocapLogoSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Text entrance
  const textProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textX = interpolate(textProgress, [0, 1], [40, 0], {
    extrapolateRight: "clamp",
  });

  // Subtitle entrance
  const subtitleProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
  });

  // Exit animation
  const exitProgress = spring({
    frame: frame - 55,
    fps,
    config: { damping: 200 },
  });

  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Glow effect
  const glowOpacity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 0.6]
  );

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
          gap: 30,
        }}
      >
        {/* Logo with audio bars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            transform: `scale(${logoScale})`,
          }}
        >
          {/* Audio bars icon */}
          <div style={{ position: "relative" }}>
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                inset: -30,
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)",
                opacity: glowOpacity,
                filter: "blur(20px)",
              }}
            />
            <div
              style={{
                background: "rgba(99, 102, 241, 0.15)",
                borderRadius: 20,
                padding: "20px 24px",
                border: "1px solid rgba(99, 102, 241, 0.3)",
              }}
            >
              <AudioBars frame={frame} fps={fps} />
            </div>
          </div>

          {/* VOCAP text */}
          <div
            style={{
              opacity: textOpacity,
              transform: `translateX(${textX}px)`,
            }}
          >
            <span
              style={{
                fontSize: 90,
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
                fontFamily: "Inter, sans-serif",
              }}
            >
              VOCAP
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: interpolate(subtitleProgress, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0], {
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Transcriptor IA
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
