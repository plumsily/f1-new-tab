import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import Countdown from "./Countdown";
import "./Name.css";

const Name = ({ currentRace, raceTime }) => {
  return (
    <div className="flex flex-col justify-self-center self-start items-center row-start-2 row-end-3 col-start-1 col-end-5 pt-16">
      <CSSTransition in={true} timeout={1000} classNames="name" appear>
        <div className="flex flex-col justify-self-center self-center items-center z-20 mb-16">
          <h1 className="w-max uppercase font-medium drop-shadow-[0_0_8px_rgba(0,0,0,1)]  text-white z-10 sm:text-lg sm:mb-2 xl:mb-4 xl:text-xl">
            Next Formula 1 Race
          </h1>
          <h1 className="w-max uppercase font-medium drop-shadow-[0_0_8px_rgba(0,0,0,1)]  text-white z-10 sm:text-5xl sm:mb-2 xl:mb-4 xl:text-6xl">
            {currentRace?.raceName}
          </h1>
          <h2 className="w-fit mb-2 uppercase font-medium drop-shadow-[0_0_8px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-xl sm:mb-0 xl:mb-2 xl:text-2xl">
            {currentRace?.Circuit?.circuitName}
          </h2>
          <h3 className="w-fit uppercase font-medium drop-shadow-[0_0_8px_rgba(0,0,0,1)] text-orange-400 z-10 sm:text-xl xl:text-2xl">
            {currentRace?.date}
          </h3>
        </div>
      </CSSTransition>
      <Countdown currentRace={currentRace} raceTime={raceTime} />
    </div>
  );
};

export default Name;
