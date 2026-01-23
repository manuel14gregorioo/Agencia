import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Zap icon SVG path
const ZapIcon = ({ size = 48, color = "#fff" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const LogoSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zap icon animation - bouncy entrance
  const zapScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  const zapRotation = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Logo text animation - smooth entrance
  const textProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textX = interpolate(textProgress, [0, 1], [50, 0], {
    extrapolateRight: "clamp",
  });

  // Glow effect
  const glowOpacity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.3, 0.6]
  );

  // Exit animation
  const exitProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 200 },
  });

  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateRight: "clamp",
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.8], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Zap Icon with glow */}
        <div
          style={{
            position: "relative",
            transform: `scale(${zapScale}) rotate(${interpolate(zapRotation, [0, 1], [-15, 0])}deg)`,
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              inset: -20,
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)",
              opacity: glowOpacity,
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              borderRadius: 16,
              padding: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 50px rgba(99, 102, 241, 0.3)",
            }}
          >
            <ZapIcon size={64} color="#fff" />
          </div>
        </div>

        {/* Logo Text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Agencia
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Dev
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
