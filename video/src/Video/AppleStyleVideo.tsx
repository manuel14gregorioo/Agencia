/**
 * ============================================
 * APPLE STYLE VIDEO
 * ============================================
 * Video promocional minimalista estilo Apple
 * - Fondo negro puro
 * - Tipografía grande y limpia
 * - Animaciones suaves de fade y scale
 * - Ritmo pausado e impactante
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

// Componente para texto con fade-in elegante
const FadeInText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 30, className = "", style = {} }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame - delay,
    [0, duration],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const translateY = interpolate(
    frame - delay,
    [0, duration],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Componente para texto que aparece palabra por palabra
const WordByWord: React.FC<{
  text: string;
  startFrame: number;
  delayPerWord?: number;
  className?: string;
}> = ({ text, startFrame, delayPerWord = 8, className = "" }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div className={`flex flex-wrap justify-center gap-x-4 ${className}`}>
      {words.map((word, index) => {
        const wordDelay = startFrame + index * delayPerWord;
        const opacity = interpolate(
          frame - wordDelay,
          [0, 20],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }
        );
        const translateY = interpolate(
          frame - wordDelay,
          [0, 20],
          [40, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }
        );

        return (
          <span
            key={index}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Secuencia 1: Opening - "Imagina"
const OpeningSequence: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [0, 60, 80],
    [0.9, 1, 1.05],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const opacity = interpolate(
    frame,
    [70, 90],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div style={{ opacity, transform: `scale(${scale})` }}>
        <FadeInText delay={10} duration={40}>
          <h1 className="text-8xl font-semibold text-white tracking-tight">
            Imagina.
          </h1>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

// Secuencia 2: El problema
const ProblemSequence: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [80, 100],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill className="flex items-center justify-center" style={{ opacity }}>
      <div className="text-center max-w-4xl px-8">
        <WordByWord
          text="Tu idea hecha realidad"
          startFrame={10}
          delayPerWord={10}
          className="text-6xl font-semibold text-white tracking-tight mb-8"
        />
        <FadeInText delay={50} duration={30}>
          <p className="text-3xl text-white/60 font-light">
            En semanas, no meses.
          </p>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

// Secuencia 3: Stats impactantes
const StatsSequence: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div className="flex gap-32">
        {/* Stat 1 */}
        <FadeInText delay={10} duration={30} className="text-center">
          <p className="text-9xl font-bold text-white mb-4">2</p>
          <p className="text-2xl text-white/50 font-light tracking-widest uppercase">
            Semanas
          </p>
        </FadeInText>

        {/* Divider */}
        <FadeInText delay={30} duration={20}>
          <div className="w-px h-40 bg-white/20 self-center" />
        </FadeInText>

        {/* Stat 2 */}
        <FadeInText delay={40} duration={30} className="text-center">
          <p className="text-9xl font-bold text-white mb-4">3K</p>
          <p className="text-2xl text-white/50 font-light tracking-widest uppercase">
            Euros
          </p>
        </FadeInText>

        {/* Divider */}
        <FadeInText delay={50} duration={20}>
          <div className="w-px h-40 bg-white/20 self-center" />
        </FadeInText>

        {/* Stat 3 */}
        <FadeInText delay={60} duration={30} className="text-center">
          <p className="text-9xl font-bold text-white mb-4">100%</p>
          <p className="text-2xl text-white/50 font-light tracking-widest uppercase">
            Tuyo
          </p>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

// Secuencia 4: Diferenciadores
const DifferentiatorsSequence: React.FC = () => {
  const frame = useCurrentFrame();

  const items = [
    "Precio fijo. Sin sorpresas.",
    "Código tuyo. Para siempre.",
    "Soporte incluido. 1 mes.",
  ];

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div className="space-y-12">
        {items.map((item, index) => (
          <FadeInText
            key={index}
            delay={10 + index * 25}
            duration={25}
            className="text-center"
          >
            <p className="text-5xl font-light text-white tracking-tight">
              {item}
            </p>
          </FadeInText>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Secuencia 5: CTA Final
const CTASequence: React.FC = () => {
  const frame = useCurrentFrame();

  const logoScale = interpolate(
    frame,
    [0, 40],
    [0.8, 1],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    }
  );

  return (
    <AbsoluteFill className="flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <FadeInText delay={0} duration={30}>
          <div
            className="mb-12"
            style={{ transform: `scale(${logoScale})` }}
          >
            <h1 className="text-7xl font-bold text-white tracking-tight">
              Agencia<span className="text-purple-500">Dev</span>
            </h1>
          </div>
        </FadeInText>

        {/* Tagline */}
        <FadeInText delay={30} duration={25}>
          <p className="text-3xl text-white/70 font-light mb-16">
            De idea a realidad.
          </p>
        </FadeInText>

        {/* CTA */}
        <FadeInText delay={50} duration={25}>
          <div className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full">
            <span className="text-2xl font-semibold">agenciadev.es</span>
          </div>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

// Video principal
export const AppleStyleVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out global al final
  const globalOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        fontFamily: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        opacity: globalOpacity,
      }}
    >
      {/* Secuencia 1: Opening (0-90 frames, 0-3s) */}
      <Sequence from={0} durationInFrames={100}>
        <OpeningSequence />
      </Sequence>

      {/* Secuencia 2: Problem/Solution (90-190 frames, 3-6.3s) */}
      <Sequence from={90} durationInFrames={110}>
        <ProblemSequence />
      </Sequence>

      {/* Secuencia 3: Stats (190-290 frames, 6.3-9.6s) */}
      <Sequence from={190} durationInFrames={110}>
        <StatsSequence />
      </Sequence>

      {/* Secuencia 4: Diferenciadores (290-400 frames, 9.6-13.3s) */}
      <Sequence from={290} durationInFrames={120}>
        <DifferentiatorsSequence />
      </Sequence>

      {/* Secuencia 5: CTA (400-500 frames, 13.3-16.6s) */}
      <Sequence from={400} durationInFrames={100}>
        <CTASequence />
      </Sequence>
    </AbsoluteFill>
  );
};

export default AppleStyleVideo;
