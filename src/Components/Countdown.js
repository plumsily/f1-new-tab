import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";
import moment from "moment";

var momentDurationFormatSetup = require("moment-duration-format");

const Countdown = ({ currentRace, currentDate, raceTime }) => {
  if (currentRace && currentDate && raceTime) {
    return (
      <div className="flex flex-col justify-self-center self-center items-center row-start-2 row-end-3 col-start-1 col-end-5 py-4 rounded-3xl shadow-xl z-20">
        <h1 className="w-max uppercase font-medium drop-shadow-[0_0_5px_rgba(0,0,0,1)]  text-white z-10 sm:text-lg sm:mb-2 xl:mb-4 xl:text-xl">
          Next Formula 1 Race
        </h1>
        <h1 className="w-max uppercase font-medium drop-shadow-[0_0_5px_rgba(0,0,0,1)]  text-white z-10 sm:text-5xl sm:mb-2 xl:mb-4 xl:text-6xl">
          {currentRace?.raceName}
        </h1>
        <h2 className="w-fit mb-2 uppercase font-medium drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-xl sm:mb-0 xl:mb-2 xl:text-2xl">
          {currentRace?.Circuit?.circuitName}
        </h2>
        <h3 className="w-fit mb-16 uppercase font-medium drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-xl sm:mb-8 xl:mb-16 xl:text-2xl">
          {currentRace?.date}
        </h3>

        <div className="text-white font-medium uppercase drop-shadow-[0_0_5px_rgba(0,0,0,1)] sm:text-4xl xl:text-5xl">
          {moment
            .duration(moment(raceTime).diff(moment(currentDate)))
            .format("DD [d] HH [h] mm [m] ss [s]")}
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default Countdown;
