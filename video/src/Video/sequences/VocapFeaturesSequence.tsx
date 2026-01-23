import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const features = [
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    title: "Transcripci\u00f3n Autom\u00e1tica",
    description: "Whisper IA de OpenAI",
    gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Res\u00famenes con IA",
    description: "Claude genera insights",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    title: "Extracci\u00f3n de Tareas",
    description: "Action items autom\u00e1ticos",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  },
];

const FeatureIcon = ({ path, gradient }: { path: string; gradient: string }) => (
  <div
    style={{
      width: 56,
      height: 56,
      borderRadius: 14,
      background: gradient,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    }}
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  </div>
);

export const VocapFeaturesSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Exit
  const exitProgress = spring({
    frame: frame - 60,
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
          gap: 50,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(titleProgress, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0], {
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Todo en una plataforma
          </span>
        </div>

        {/* Features grid */}
        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          {features.map((feature, index) => {
            const delay = 10 + index * 10;
            const cardProgress = spring({
              frame: frame - delay,
              fps,
              config: { damping: 15, stiffness: 100 },
            });

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  padding: "36px 40px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 20,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  minWidth: 280,
                  opacity: interpolate(cardProgress, [0, 1], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(
                    cardProgress,
                    [0, 1],
                    [60, 0],
                    { extrapolateRight: "clamp" }
                  )}px) scale(${interpolate(cardProgress, [0, 1], [0.8, 1], {
                    extrapolateRight: "clamp",
                  })})`,
                }}
              >
                <FeatureIcon path={feature.icon} gradient={feature.gradient} />
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {feature.title}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.6)",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                  }}
                >
                  {feature.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
