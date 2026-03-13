import { Composition, Still } from "remotion";
import { AgendaDemo } from "./AgendaDemo";
import { ReportsDemo } from "./ReportsDemo";
import { RoomsDemo } from "./RoomsDemo";
import { OgImage } from "./OgImage";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AgendaDemo"
        component={AgendaDemo}
        durationInFrames={180}
        fps={30}
        width={1200}
        height={800}
      />
      <Composition
        id="ReportsDemo"
        component={ReportsDemo}
        durationInFrames={180}
        fps={30}
        width={1200}
        height={800}
      />
      <Composition
        id="RoomsDemo"
        component={RoomsDemo}
        durationInFrames={150}
        fps={30}
        width={1200}
        height={800}
      />
      <Still id="OgImage" component={OgImage} width={1200} height={630} />
    </>
  );
};
