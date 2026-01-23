import { Composition } from "remotion";
import { IntroVideo } from "./Video/IntroVideo";
import { VocapVideo } from "./Video/VocapVideo";
import { AppleStyleVideo } from "./Video/AppleStyleVideo";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* AgenciaDev Videos */}
      <Composition
        id="IntroVideo"
        component={IntroVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="IntroVideoSquare"
        component={IntroVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* VOCAP Videos */}
      <Composition
        id="VocapVideo"
        component={VocapVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VocapVideoSquare"
        component={VocapVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* Apple Style Videos */}
      <Composition
        id="AppleStyleVideo"
        component={AppleStyleVideo}
        durationInFrames={500}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AppleStyleVideoSquare"
        component={AppleStyleVideo}
        durationInFrames={500}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
