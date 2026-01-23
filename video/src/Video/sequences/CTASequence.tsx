import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Calendar icon
const CalendarIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Zap icon
const ZapIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const CTASequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const scale = interpolate(entrance, [0, 1], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Button pulse animation
  const pulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [1, 1.05]
  );

  // Glow intensity
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.4, 0.8]
  );

  // Text shimmer effect
  const shimmerX = interpolate(frame, [0, 60], [-100, 200], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            borderRadius: 20,
            padding: 20,
            color: "#fff",
            boxShadow: `0 0 60px rgba(99, 102, 241, ${glowIntensity})`,
          }}
        >
          <ZapIcon />
        </div>

        {/* CTA Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Inter, sans-serif",
            }}
          >
            \u00bfListo para empezar?
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Agenda una llamada de 30 minutos sin compromiso
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            position: "relative",
            transform: `scale(${pulse})`,
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              inset: -10,
              background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
              borderRadius: 24,
              filter: "blur(25px)",
              opacity: glowIntensity * 0.6,
            }}
          />

          {/* Button */}
          <div
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: 16,
              padding: "24px 48px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
              overflow: "hidden",
            }}
          >
            {/* Shimmer effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: shimmerX,
                width: 100,
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transform: "skewX(-20deg)",
              }}
            />

            <CalendarIcon />
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Agendar Llamada
            </span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 20,
          }}
        >
          {["Respuesta <24h", "Precio fijo", "Sin permanencia"].map(
            (text, index) => {
              const tagDelay = 20 + index * 8;
              const tagEntrance = spring({
                frame: frame - tagDelay,
                fps,
                config: { damping: 200 },
              });

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: interpolate(tagEntrance, [0, 1], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                    transform: `translateY(${interpolate(
                      tagEntrance,
                      [0, 1],
                      [20, 0],
                      { extrapolateRight: "clamp" }
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#10b981",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.7)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {text}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
