import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { VocapLogoSequence } from "./sequences/VocapLogoSequence";
import { VocapTaglineSequence } from "./sequences/VocapTaglineSequence";
import { VocapFeaturesSequence } from "./sequences/VocapFeaturesSequence";
import { VocapStatsSequence } from "./sequences/VocapStatsSequence";
import { VocapCTASequence } from "./sequences/VocapCTASequence";

export const VocapVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, 300], [0, 100], {
    extrapolateRight: "clamp",
  });

  // Audio wave animation for background
  const waveOffset = frame * 2;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + gradientProgress * 0.2}deg, #0f172a 0%, #1e1b4b 40%, #312e81 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Animated audio waves background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
        }}
      >
        {[...Array(8)].map((_, i) => {
          const waveHeight = interpolate(
            Math.sin((frame * 0.05) + (i * 0.5)),
            [-1, 1],
            [20, 80]
          );
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${10 + i * 12}%`,
                bottom: "40%",
                width: 30,
                height: waveHeight,
                background: `linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)`,
                borderRadius: 15,
                transform: `translateY(${waveHeight / 2}px)`,
              }}
            />
          );
        })}
      </div>

      {/* Floating orbs */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          top: "5%",
          right: "10%",
          transform: `translateY(${Math.sin(frame * 0.02) * 30}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          bottom: "10%",
          left: "5%",
          transform: `translateY(${Math.cos(frame * 0.025) * 25}px)`,
        }}
      />

      {/* Logo Sequence: 0-80 frames */}
      <Sequence from={0} durationInFrames={80} premountFor={30}>
        <VocapLogoSequence />
      </Sequence>

      {/* Tagline Sequence: 50-150 frames */}
      <Sequence from={50} durationInFrames={100} premountFor={30}>
        <VocapTaglineSequence />
      </Sequence>

      {/* Features Sequence: 120-210 frames */}
      <Sequence from={120} durationInFrames={90} premountFor={30}>
        <VocapFeaturesSequence />
      </Sequence>

      {/* Stats Sequence: 180-260 frames */}
      <Sequence from={180} durationInFrames={80} premountFor={30}>
        <VocapStatsSequence />
      </Sequence>

      {/* CTA Sequence: 230-300 frames */}
      <Sequence from={230} durationInFrames={70} premountFor={30}>
        <VocapCTASequence />
      </Sequence>
    </AbsoluteFill>
  );
};
