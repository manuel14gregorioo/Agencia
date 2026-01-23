import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Audio bars mini
const AudioBarsMini = ({ frame }: { frame: number }) => {
  const bars = [0.5, 0.8, 1, 0.6, 0.9];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 30 }}>
      {bars.map((baseHeight, i) => {
        const height = interpolate(
          Math.sin(frame * 0.15 + i * 0.7),
          [-1, 1],
          [baseHeight * 12, baseHeight * 28]
        );
        return (
          <div
            key={i}
            style={{
              width: 4,
              height,
              background: "#fff",
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
};

export const VocapCTASequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main entrance
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Button pulse
  const pulse = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [1, 1.05]
  );

  // Glow intensity
  const glowIntensity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.4, 0.8]
  );

  // Shimmer effect
  const shimmerX = interpolate(frame, [0, 50], [-100, 250], {
    extrapolateRight: "clamp",
  });

  // Badges entrance
  const badgeProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: interpolate(entrance, [0, 1], [0, 1], {
          extrapolateRight: "clamp",
        }),
        transform: `scale(${interpolate(entrance, [0, 1], [0.8, 1], {
          extrapolateRight: "clamp",
        })})`,
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
        {/* Logo mini */}
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            borderRadius: 16,
            padding: 16,
            boxShadow: `0 0 50px rgba(99, 102, 241, ${glowIntensity})`,
          }}
        >
          <AudioBarsMini frame={frame} />
        </div>

        {/* CTA text */}
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
            Prueba gratis
          </span>
          <span
            style={{
              fontSize: 36,
              fontWeight: 600,
              background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Inter, sans-serif",
            }}
          >
            30 minutos sin tarjeta
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            position: "relative",
            transform: `scale(${pulse})`,
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              inset: -15,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: 24,
              filter: "blur(30px)",
              opacity: glowIntensity * 0.5,
            }}
          />

          {/* Button */}
          <div
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: 16,
              padding: "24px 56px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
              overflow: "hidden",
            }}
          >
            {/* Shimmer */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: shimmerX,
                width: 80,
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transform: "skewX(-20deg)",
              }}
            />
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Empezar Ahora
            </span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom badges */}
        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 10,
            opacity: interpolate(badgeProgress, [0, 1], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {[
            "Sin tarjeta de cr\u00e9dito",
            "Cancela cuando quieras",
            "+50 idiomas",
          ].map((text, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Website */}
        <div
          style={{
            marginTop: 20,
            opacity: interpolate(badgeProgress, [0, 1], [0, 0.6], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            vocap.io
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
