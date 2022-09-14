import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";
import moment from "moment";

var momentDurationFormatSetup = require("moment-duration-format");

const Countdown = ({ currentRace, currentDate, raceTime }) => {
  return (
    <div className="flex flex-col justify-self-center self-start pt-10 items-center row-start-1 row-end-2 col-start-2 col-end-3 drop-shadow-2xl z-20">
      {/* <h1 className="w-max mb-2 text-4xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-white z-10 sm:text-2xl xl:text-6xl">
        {currentRace?.raceName}
      </h1>
      <h2 className="w-fit mb-2 text-xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-base xl:text-3xl">
        {currentRace?.Circuit?.circuitName}
      </h2>
      <h3 className="w-fit mb-16 text-xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-base xl:text-3xl">
        {currentRace?.date}
      </h3> */}

      <div className="text-white text-6xl font-medium uppercase ">
        {moment
          .duration(moment(raceTime).diff(moment(currentDate)))
          .format("DD [d] HH [h] mm [m] ss [s]")}
      </div>
    </div>
  );
};

export default Countdown;
