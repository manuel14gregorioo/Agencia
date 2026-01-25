import { Composition } from "remotion";
import { MGMIntro } from "./MGMIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MGMIntro"
        component={MGMIntro}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1080}
        height={1920} // Instagram Reels vertical format
      />
    </>
  );
};
