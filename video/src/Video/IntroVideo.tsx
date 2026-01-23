import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { LogoSequence } from "./sequences/LogoSequence";
import { TaglineSequence } from "./sequences/TaglineSequence";
import { DifferentiatorsSequence } from "./sequences/DifferentiatorsSequence";
import { CTASequence } from "./sequences/CTASequence";

export const IntroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, 300], [0, 100], {
    extrapolateRight: "clamp",
  });

  // Floating orbs animation
  const orb1Y = interpolate(frame, [0, 300], [0, -50]);
  const orb2Y = interpolate(frame, [0, 300], [0, 30]);
  const orb1Scale = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [0.9, 1.1]
  );
  const orb2Scale = interpolate(
    Math.sin(frame * 0.025 + 1),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + gradientProgress * 0.3}deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Animated background orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          top: "10%",
          left: "60%",
          transform: `translateY(${orb1Y}px) scale(${orb1Scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          top: "50%",
          left: "10%",
          transform: `translateY(${orb2Y}px) scale(${orb2Scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          top: "70%",
          left: "70%",
          transform: `translateY(${orb1Y * 0.5}px)`,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Logo Sequence: 0-90 frames (0-3s) */}
      <Sequence from={0} durationInFrames={90} premountFor={30}>
        <LogoSequence />
      </Sequence>

      {/* Tagline Sequence: 60-180 frames (2-6s) */}
      <Sequence from={60} durationInFrames={120} premountFor={30}>
        <TaglineSequence />
      </Sequence>

      {/* Differentiators Sequence: 150-250 frames (5-8.3s) */}
      <Sequence from={150} durationInFrames={100} premountFor={30}>
        <DifferentiatorsSequence />
      </Sequence>

      {/* CTA Sequence: 220-300 frames (7.3-10s) */}
      <Sequence from={220} durationInFrames={80} premountFor={30}>
        <CTASequence />
      </Sequence>
    </AbsoluteFill>
  );
};
