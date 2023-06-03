import { Player } from "@livepeer/react";
import { useLocation } from "react-router-dom";

const WatchStream = () => {
  const { state } = useLocation();
  return (
    <div>
      <div className=" flex justify-center h-screen flex-1">
        <div className="w-full h-[75%] flex justify-center">
          <Player
            title={state?.stream?.name}
            playbackId={state?.stream?.playbackId}
            autoPlay
            muted
          />
        </div>
      </div>
    </div>
  );
};

export default WatchStream;
