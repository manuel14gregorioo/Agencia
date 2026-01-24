/**
 * ============================================
 * APPLE STYLE VIDEO
 * ============================================
 * Video promocional minimalista estilo Apple
 * - Fondo negro puro
 * - Tipografía grande y limpia
 * - Animaciones suaves de fade y scale
 * - Ritmo pausado e impactante
 *
 * NOTA: Usa estilos inline (no Tailwind) para garantizar renderizado
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

// Estilos base
const styles = {
  container: {
    backgroundColor: "#000",
    fontFamily: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  centerFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#fff",
    margin: 0,
    padding: 0,
  },
  textMuted: {
    color: "rgba(255, 255, 255, 0.6)",
  },
  textCenter: {
    textAlign: "center" as const,
  },
};

// Componente para texto con fade-in elegante
const FadeInText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, duration = 30, style = {} }) => {
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
  style?: React.CSSProperties;
}> = ({ text, startFrame, delayPerWord = 8, style = {} }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "0 16px",
      ...style
    }}>
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
    <AbsoluteFill style={styles.centerFlex}>
      <div style={{ opacity, transform: `scale(${scale})` }}>
        <FadeInText delay={10} duration={40}>
          <h1 style={{
            ...styles.text,
            fontSize: 120,
            fontWeight: 600,
            letterSpacing: "-0.02em"
          }}>
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
    <AbsoluteFill style={{ ...styles.centerFlex, opacity }}>
      <div style={{ ...styles.textCenter, maxWidth: 900, padding: "0 32px" }}>
        <WordByWord
          text="Tu idea hecha realidad"
          startFrame={10}
          delayPerWord={10}
          style={{
            ...styles.text,
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        />
        <FadeInText delay={50} duration={30}>
          <p style={{
            ...styles.textMuted,
            fontSize: 40,
            fontWeight: 300,
          }}>
            En semanas, no meses.
          </p>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

// Secuencia 3: Stats impactantes
const StatsSequence: React.FC = () => {
  return (
    <AbsoluteFill style={styles.centerFlex}>
      <div style={{ display: "flex", gap: 120, alignItems: "center" }}>
        {/* Stat 1 */}
        <FadeInText delay={10} duration={30} style={styles.textCenter}>
          <p style={{ ...styles.text, fontSize: 140, fontWeight: 700, marginBottom: 16 }}>2</p>
          <p style={{
            ...styles.textMuted,
            fontSize: 24,
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            opacity: 0.5,
          }}>
            Semanas
          </p>
        </FadeInText>

        {/* Divider */}
        <FadeInText delay={30} duration={20}>
          <div style={{ width: 1, height: 120, backgroundColor: "rgba(255,255,255,0.2)" }} />
        </FadeInText>

        {/* Stat 2 */}
        <FadeInText delay={40} duration={30} style={styles.textCenter}>
          <p style={{ ...styles.text, fontSize: 140, fontWeight: 700, marginBottom: 16 }}>3K</p>
          <p style={{
            ...styles.textMuted,
            fontSize: 24,
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            opacity: 0.5,
          }}>
            Euros
          </p>
        </FadeInText>

        {/* Divider */}
        <FadeInText delay={50} duration={20}>
          <div style={{ width: 1, height: 120, backgroundColor: "rgba(255,255,255,0.2)" }} />
        </FadeInText>

        {/* Stat 3 */}
        <FadeInText delay={60} duration={30} style={styles.textCenter}>
          <p style={{ ...styles.text, fontSize: 140, fontWeight: 700, marginBottom: 16 }}>100%</p>
          <p style={{
            ...styles.textMuted,
            fontSize: 24,
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            opacity: 0.5,
          }}>
            Tuyo
          </p>
        </FadeInText>
      </div>
    </AbsoluteFill>
  );
};

// Secuencia 4: Diferenciadores
const DifferentiatorsSequence: React.FC = () => {
  const items = [
    "Precio fijo. Sin sorpresas.",
    "Código tuyo. Para siempre.",
    "Soporte incluido. 1 mes.",
  ];

  return (
    <AbsoluteFill style={styles.centerFlex}>
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {items.map((item, index) => (
          <FadeInText
            key={index}
            delay={10 + index * 25}
            duration={25}
            style={styles.textCenter}
          >
            <p style={{
              ...styles.text,
              fontSize: 56,
              fontWeight: 300,
              letterSpacing: "-0.01em"
            }}>
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
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <AbsoluteFill style={styles.centerFlex}>
      <div style={styles.textCenter}>
        {/* Logo */}
        <FadeInText delay={0} duration={30}>
          <div style={{ marginBottom: 48, transform: `scale(${logoScale})` }}>
            <h1 style={{
              ...styles.text,
              fontSize: 90,
              fontWeight: 700,
              letterSpacing: "-0.02em"
            }}>
              Agencia<span style={{ color: "#a855f7" }}>Dev</span>
            </h1>
          </div>
        </FadeInText>

        {/* Tagline */}
        <FadeInText delay={30} duration={25}>
          <p style={{
            ...styles.textMuted,
            fontSize: 36,
            fontWeight: 300,
            marginBottom: 64
          }}>
            De idea a realidad.
          </p>
        </FadeInText>

        {/* CTA */}
        <FadeInText delay={50} duration={25}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#fff",
            color: "#000",
            padding: "20px 40px",
            borderRadius: 50,
          }}>
            <span style={{ fontSize: 28, fontWeight: 600 }}>agenciadev.es</span>
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
    <AbsoluteFill style={{ ...styles.container, opacity: globalOpacity }}>
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
