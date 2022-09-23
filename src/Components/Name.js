import React from "react";
import { CSSTransition } from "react-transition-group";

import Countdown from "./Countdown";
import "./Name.css";

const Name = ({ currentRace, raceTime, isSelected, visibility }) => {
  return (
    <div className="flex flex-col justify-self-center self-start items-center row-start-2 row-end-3 col-start-1 col-end-5 pt-12">
      <CSSTransition in={isSelected} timeout={800} classNames="name" appear>
        <div className="text flex flex-col justify-self-center self-center items-center z-20 mb-16 uppercase font-bold drop-shadow-[0_0_30px_rgba(0,0,0,1)]">
          <h1
            className={`${visibility} w-max text-white z-10 sm:text-lg sm:mb-4 xl:mb-8 xl:text-xl`}
          >
            Next Formula 1 Race
          </h1>
          <h1 className="w-max text-white drop-shadow-[0_0_2px_rgba(251,146,60,0.4)] z-10 sm:text-5xl sm:mb-4 xl:mb-8 xl:text-6xl">
            {currentRace?.raceName}
          </h1>
          <h2 className="w-fit mb-2 text-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-10 sm:text-xl sm:mb-0 xl:mb-2 xl:text-2xl">
            {currentRace?.Circuit?.circuitName}
          </h2>
          <h3 className="w-fit text-orange-500 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-10 sm:text-xl xl:text-2xl">
            {currentRace?.date}
          </h3>
        </div>
      </CSSTransition>
      <Countdown
        raceTime={raceTime}
        visibility={visibility}
        isSelected={isSelected}
      />
    </div>
  );
};

export default Name;
