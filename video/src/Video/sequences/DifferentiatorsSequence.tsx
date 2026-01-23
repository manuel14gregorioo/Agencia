import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const differentiators = [
  {
    number: "2",
    unit: "semanas",
    label: "Desarrollo completo",
    gradient: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
  },
  {
    number: "3-8k",
    unit: "\u20ac",
    label: "Precio fijo cerrado",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  },
  {
    number: "1",
    unit: "t\u00e9cnico",
    label: "Comunicaci\u00f3n directa",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
  },
];

// Clock icon
const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// Euro icon
const EuroIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 10h12M4 14h12M6 6a8 8 0 0 1 0 12" />
  </svg>
);

// User icon
const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const icons = [ClockIcon, EuroIcon, UserIcon];

export const DifferentiatorsSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Exit animation
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
          gap: 60,
          justifyContent: "center",
        }}
      >
        {differentiators.map((item, index) => {
          const delay = index * 12;

          const cardEntrance = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const scale = interpolate(cardEntrance, [0, 1], [0.5, 1], {
            extrapolateRight: "clamp",
          });

          const opacity = interpolate(cardEntrance, [0, 1], [0, 1], {
            extrapolateRight: "clamp",
          });

          const y = interpolate(cardEntrance, [0, 1], [80, 0], {
            extrapolateRight: "clamp",
          });

          // Number count up animation
          const countProgress = spring({
            frame: frame - delay - 10,
            fps,
            config: { damping: 200 },
            durationInFrames: 30,
          });

          const Icon = icons[index];

          return (
            <div
              key={index}
              style={{
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Card */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 24,
                  padding: "40px 50px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  minWidth: 280,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    color: "#fff",
                    opacity: 0.7,
                    marginBottom: 8,
                  }}
                >
                  <Icon />
                </div>

                {/* Number */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 72,
                      fontWeight: 800,
                      background: item.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.number}
                  </span>
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.8)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.unit}
                  </span>
                </div>

                {/* Label */}
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
