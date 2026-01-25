import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  AbsoluteFill,
  Sequence,
} from "remotion";
import { loadFont as loadClashDisplay } from "@remotion/google-fonts/Syne";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

// Load fonts
const { fontFamily: clashFamily } = loadClashDisplay();
const { fontFamily: outfitFamily } = loadOutfit();

// Brand colors
const COLORS = {
  noir: "#0A0A0B",
  lime: "#BFFF00",
  coral: "#FF6B4A",
  cream: "#F7F7F5",
};

export const MGMIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // === PHASE 1: Background flash and lines (0-30 frames) ===
  const flashOpacity = interpolate(frame, [0, 8, 15], [0, 1, 0], {
    extrapolateRight: "clamp",
  });

  // === PHASE 2: M.G.M Logo reveal (15-75 frames) ===
  const logoScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const logoRotation = interpolate(
    spring({
      frame: frame - 15,
      fps,
      config: { damping: 15 },
    }),
    [0, 1],
    [-15, 0]
  );

  // === PHASE 3: Text reveals (45-120 frames) ===
  const text1Progress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 200 },
  });

  const text2Progress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 200 },
  });

  const text3Progress = spring({
    frame: frame - 75,
    fps,
    config: { damping: 200 },
  });

  // === PHASE 4: "YA EXISTIMOS" big reveal (90-130 frames) ===
  const existimosScale = spring({
    frame: frame - 90,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const existimosY = interpolate(existimosScale, [0, 1], [100, 0]);

  // === PHASE 5: Final pulse and fade (130-150 frames) ===
  const finalPulse = interpolate(
    frame,
    [130, 135, 140, 145, 150],
    [1, 1.05, 1, 1.02, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Glitch effect for logo
  const glitchX = frame > 20 && frame < 40 && frame % 5 === 0 ? Math.random() * 10 - 5 : 0;
  const glitchY = frame > 20 && frame < 40 && frame % 7 === 0 ? Math.random() * 6 - 3 : 0;

  // Scanline effect
  const scanlineY = (frame * 8) % 1920;

  // Decorative lines animation
  const line1Width = interpolate(frame, [10, 40], [0, 400], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  const line2Width = interpolate(frame, [20, 50], [0, 300], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.noir }}>
      {/* Initial flash */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.lime,
          opacity: flashOpacity,
        }}
      />

      {/* Scanline effect */}
      <div
        style={{
          position: "absolute",
          top: scanlineY,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: COLORS.lime,
          opacity: 0.1,
        }}
      />

      {/* Grid pattern background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.cream}08 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.cream}08 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 0,
          width: line1Width,
          height: 8,
          backgroundColor: COLORS.lime,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1500,
          right: 0,
          width: line2Width,
          height: 8,
          backgroundColor: COLORS.coral,
        }}
      />

      {/* M.G.M Logo */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${logoScale * finalPulse})
            rotate(${logoRotation}deg)
            translate(${glitchX}px, ${glitchY}px)
          `,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Border frame */}
        <div
          style={{
            padding: "40px 60px",
            border: `8px solid ${COLORS.cream}`,
            backgroundColor: COLORS.noir,
            position: "relative",
          }}
        >
          {/* Glitch shadow layers */}
          {frame > 20 && frame < 40 && (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.coral,
                  fontFamily: "Times New Roman, Times, serif",
                  fontSize: 120,
                  fontWeight: 400,
                  opacity: 0.5,
                  transform: "translate(-4px, -2px)",
                }}
              >
                M.G.M
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.lime,
                  fontFamily: "Times New Roman, Times, serif",
                  fontSize: 120,
                  fontWeight: 400,
                  opacity: 0.5,
                  transform: "translate(4px, 2px)",
                }}
              >
                M.G.M
              </div>
            </>
          )}
          <span
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: 120,
              fontWeight: 400,
              color: COLORS.cream,
              letterSpacing: "0.05em",
              position: "relative",
            }}
          >
            M.G.M
          </span>
        </div>
      </div>

      {/* Tagline texts */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* "AUTOMATIONS" */}
        <div
          style={{
            fontFamily: outfitFamily,
            fontSize: 48,
            fontWeight: 300,
            color: COLORS.cream,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: text1Progress,
            transform: `translateY(${interpolate(text1Progress, [0, 1], [30, 0])}px)`,
          }}
        >
          AUTOMATIONS
        </div>

        {/* Separator line */}
        <div
          style={{
            width: interpolate(text2Progress, [0, 1], [0, 200]),
            height: 3,
            backgroundColor: COLORS.lime,
          }}
        />

        {/* Services */}
        <div
          style={{
            fontFamily: outfitFamily,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.cream,
            opacity: text3Progress * 0.7,
            letterSpacing: "0.2em",
            transform: `translateY(${interpolate(text3Progress, [0, 1], [20, 0])}px)`,
          }}
        >
          WEB & SAAS
        </div>
      </div>

      {/* "YA EXISTIMOS" reveal */}
      <Sequence from={90}>
        <div
          style={{
            position: "absolute",
            bottom: 280,
            left: "50%",
            transform: `translate(-50%, ${existimosY}px) scale(${existimosScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              width: interpolate(existimosScale, [0, 1], [0, 500]),
              height: 6,
              backgroundColor: COLORS.lime,
            }}
          />

          <div
            style={{
              fontFamily: clashFamily,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.lime,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            YA EXISTIMOS
          </div>

          {/* Bottom accent */}
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 80,
                height: 4,
                backgroundColor: COLORS.coral,
              }}
            />
            <span
              style={{
                fontFamily: outfitFamily,
                fontSize: 24,
                color: COLORS.cream,
                opacity: 0.8,
                letterSpacing: "0.15em",
              }}
            >
              MADRID
            </span>
            <div
              style={{
                width: 80,
                height: 4,
                backgroundColor: COLORS.coral,
              }}
            />
          </div>
        </div>
      </Sequence>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 80,
          height: 80,
          borderTop: `4px solid ${COLORS.lime}`,
          borderLeft: `4px solid ${COLORS.lime}`,
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 80,
          height: 80,
          borderBottom: `4px solid ${COLORS.lime}`,
          borderRight: `4px solid ${COLORS.lime}`,
          opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Website URL at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: outfitFamily,
          fontSize: 26,
          color: COLORS.cream,
          opacity: interpolate(frame, [100, 120], [0, 0.6], { extrapolateRight: "clamp" }),
          letterSpacing: "0.2em",
        }}
      >
        MGMAUTOMATIONS.ES
      </div>
    </AbsoluteFill>
  );
};
