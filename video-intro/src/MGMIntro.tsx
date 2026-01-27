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
import { loadFont as loadSyne } from "@remotion/google-fonts/Syne";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

// Load fonts
const { fontFamily: syneFamily } = loadSyne();
const { fontFamily: outfitFamily } = loadOutfit();

// Brand colors - inverted for white background
const COLORS = {
  noir: "#0A0A0B",
  lime: "#9ACD00", // Slightly darker lime for contrast on white
  coral: "#FF6B4A",
  cream: "#F7F7F5",
  white: "#FFFFFF",
};

export const MGMIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // === SMOOTH SPRING CONFIG ===
  const smoothConfig = { damping: 200 };
  const gentleConfig = { damping: 25, stiffness: 120 };

  // === PHASE 1: Subtle entrance (0-20 frames) ===
  const bgFade = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // === PHASE 2: M.G.M Logo reveal (15-60 frames) ===
  const logoProgress = spring({
    frame: frame - 15,
    fps,
    config: gentleConfig,
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // === PHASE 3: "AUTOMATIONS" text (40-70 frames) ===
  const automationsProgress = spring({
    frame: frame - 40,
    fps,
    config: smoothConfig,
  });

  // === PHASE 4: Separator line (55-85 frames) ===
  const lineProgress = spring({
    frame: frame - 55,
    fps,
    config: smoothConfig,
  });

  // === PHASE 5: "De idea a" text (65-95 frames) ===
  const deIdeaProgress = spring({
    frame: frame - 65,
    fps,
    config: smoothConfig,
  });

  // === PHASE 6: "sistema funcionando" text (80-110 frames) ===
  const sistemaProgress = spring({
    frame: frame - 80,
    fps,
    config: gentleConfig,
  });

  // === PHASE 7: URL fade in (100-130 frames) ===
  const urlProgress = spring({
    frame: frame - 100,
    fps,
    config: smoothConfig,
  });

  // === PHASE 8: Final subtle pulse (130-150 frames) ===
  const finalPulse = interpolate(
    frame,
    [130, 140, 150],
    [1, 1.02, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle decorative line animations
  const topLineWidth = interpolate(frame, [20, 60], [0, 300], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const bottomLineWidth = interpolate(frame, [30, 70], [0, 250], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.white }}>
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.noir}06 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.noir}06 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: bgFade,
        }}
      />

      {/* Top decorative line */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 0,
          width: topLineWidth,
          height: 4,
          backgroundColor: COLORS.lime,
        }}
      />

      {/* Bottom decorative line */}
      <div
        style={{
          position: "absolute",
          bottom: 400,
          right: 0,
          width: bottomLineWidth,
          height: 4,
          backgroundColor: COLORS.coral,
        }}
      />

      {/* M.G.M Logo */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          transform: `
            translate(-50%, -50%)
            scale(${logoScale * finalPulse})
          `,
          opacity: logoOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Clean border frame */}
        <div
          style={{
            padding: "45px 70px",
            border: `5px solid ${COLORS.noir}`,
            backgroundColor: COLORS.white,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: 130,
              fontWeight: 400,
              color: COLORS.noir,
              letterSpacing: "0.05em",
            }}
          >
            M.G.M
          </span>
        </div>
      </div>

      {/* AUTOMATIONS text */}
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          transform: "translate(-50%, 0)",
          opacity: automationsProgress,
        }}
      >
        <span
          style={{
            fontFamily: outfitFamily,
            fontSize: 44,
            fontWeight: 300,
            color: COLORS.noir,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
          }}
        >
          AUTOMATIONS
        </span>
      </div>

      {/* Separator line */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(lineProgress, [0, 1], [0, 180]),
          height: 3,
          backgroundColor: COLORS.lime,
        }}
      />

      {/* Main tagline - "De idea a sistema funcionando" */}
      <div
        style={{
          position: "absolute",
          top: "67%",
          left: "50%",
          transform: "translate(-50%, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        {/* "De idea a" */}
        <div
          style={{
            opacity: deIdeaProgress,
            transform: `translateY(${interpolate(deIdeaProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: outfitFamily,
              fontSize: 36,
              fontWeight: 400,
              color: COLORS.noir,
              opacity: 0.7,
              letterSpacing: "0.15em",
            }}
          >
            De idea a
          </span>
        </div>

        {/* "sistema funcionando" */}
        <div
          style={{
            opacity: sistemaProgress,
            transform: `translateY(${interpolate(sistemaProgress, [0, 1], [25, 0])}px) scale(${interpolate(sistemaProgress, [0, 1], [0.95, 1])})`,
          }}
        >
          <span
            style={{
              fontFamily: syneFamily,
              fontSize: 64,
              fontWeight: 700,
              color: COLORS.noir,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            sistema{" "}
            <span style={{ color: COLORS.lime }}>funcionando</span>
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 60,
          height: 60,
          borderTop: `3px solid ${COLORS.noir}`,
          borderLeft: `3px solid ${COLORS.noir}`,
          opacity: interpolate(frame, [40, 70], [0, 0.3], { extrapolateRight: "clamp" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 60,
          height: 60,
          borderBottom: `3px solid ${COLORS.noir}`,
          borderRight: `3px solid ${COLORS.noir}`,
          opacity: interpolate(frame, [40, 70], [0, 0.3], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Website URL at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: urlProgress * 0.6,
        }}
      >
        <span
          style={{
            fontFamily: outfitFamily,
            fontSize: 24,
            color: COLORS.noir,
            letterSpacing: "0.25em",
          }}
        >
          MGMAUTOMATIONS.ES
        </span>
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [90, 120], [0, 200], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
          height: 6,
          backgroundColor: COLORS.lime,
        }}
      />
    </AbsoluteFill>
  );
};
