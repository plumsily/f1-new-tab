import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";
import moment from "moment";

const Name = ({ currentRace }) => {
  return (
    <div className="flex flex-col justify-between px-5 py-5 w-max mb-4 mx-4 rounded-2xl backdrop-brightness-75 backdrop-grayscale-[60%] backdrop-blur h-full self-end row-start-3 row-end-4 col-start-1 col-end-2 z-20 shadow-xl sm:w-max">
      <div>
        <h4 className="w-fit mb-1 text-xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-base xl:text-2xl">
          Local time schedule:
        </h4>
        <h5 className="w-fit text-l uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-sm xl:text-xl">
          Qualifying:{" "}
          {moment
            .utc(
              currentRace?.Qualifying?.date +
                " " +
                currentRace?.Qualifying?.time.slice(0, -1)
            )
            .local()
            .format("MM-DD, dddd, HH:mm")}{" "}
        </h5>
        <h5 className="w-fit text-l uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-sm xl:text-xl">
          Race:{" "}
          {moment
            .utc(currentRace?.date + " " + currentRace?.time?.slice(0, -1))
            .local()
            .format("MM-DD, dddd, HH:mm")}{" "}
        </h5>
      </div>
      <div>
        <h3 className="w-fit text-xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-base xl:text-2xl">
          {currentRace?.date}
        </h3>
        <h2 className="w-fit mb-1 text-xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-base xl:text-2xl">
          {currentRace?.Circuit?.circuitName}
        </h2>
        <h1 className="w-max text-4xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-white z-10 sm:text-2xl xl:text-5xl">
          {currentRace?.raceName}
        </h1>
      </div>
    </div>
  );
};

export default Name;
