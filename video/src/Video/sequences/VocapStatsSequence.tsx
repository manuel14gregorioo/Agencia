import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const stats = [
  {
    value: "~2",
    unit: "min",
    label: "por hora de audio",
    color: "#6366f1",
  },
  {
    value: "+50",
    unit: "idiomas",
    label: "soportados",
    color: "#8b5cf6",
  },
  {
    value: "95-98",
    unit: "%",
    label: "precisi\u00f3n",
    color: "#10b981",
  },
  {
    value: "0",
    unit: "\u20ac",
    label: "para empezar",
    color: "#f59e0b",
  },
];

export const VocapStatsSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exit
  const exitProgress = spring({
    frame: frame - 50,
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
          gap: 50,
        }}
      >
        {stats.map((stat, index) => {
          const delay = index * 8;
          const statProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          // Count up effect for numbers
          const countProgress = spring({
            frame: frame - delay - 5,
            fps,
            config: { damping: 200 },
            durationInFrames: 20,
          });

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: interpolate(statProgress, [0, 1], [0, 1], {
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(
                  statProgress,
                  [0, 1],
                  [50, 0],
                  { extrapolateRight: "clamp" }
                )}px) scale(${interpolate(statProgress, [0, 1], [0.5, 1], {
                  extrapolateRight: "clamp",
                })})`,
              }}
            >
              {/* Value */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 72,
                    fontWeight: 800,
                    color: stat.color,
                    fontFamily: "Inter, sans-serif",
                    textShadow: `0 0 40px ${stat.color}50`,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: stat.color,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {stat.unit}
                </span>
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.6)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
