import React from "react";
import { CSSTransition } from "react-transition-group";

import Countdown from "./Countdown";
import "./Name.css";

const Name = ({
  currentRace,
  raceTime,
  isSelected,
  visibility,
  raceWeekTitle,
}) => {
  const nextRace = [];
  if (raceWeekTitle) {
    nextRace.push(
      <h1
        className={`${visibility} text w-max text-white z-10 sm:text-xl sm:mb-4 xl:mb-8 xl:text-2xl`}
      >
        It's Race Week
      </h1>
    );
  } else {
    if (visibility == "visible") {
      nextRace.push(
        <h1
          className={`${visibility} text w-max text-white z-10 sm:text-xl sm:mb-4 xl:mb-8 xl:text-2xl`}
        >
          Next Formula 1 Race
        </h1>
      );
    }
  }
  return (
    <div className="flex flex-col justify-self-center self-start items-center row-start-2 row-end-3 col-start-1 col-end-5 pt-12">
      <CSSTransition in={isSelected} timeout={800} classNames="name" appear>
        <div className="text flex flex-col justify-self-center self-center items-center z-20 mb-16 uppercase font-bold drop-shadow-[0_0_100px_rgba(0,0,0,0.6)]">
          {nextRace}
          <h1 className="w-max text-white sm:text-5xl sm:mb-4 xl:mb-8 xl:text-6xl">
            {currentRace?.raceName}
          </h1>
          <h2 className="w-fit text-lime-400 sm:text-2xl sm:mb-2 xl:mb-4 xl:text-3xl">
            {currentRace?.Circuit?.circuitName}
          </h2>
          <h3 className="w-fit text-lime-400 sm:text-2xl xl:text-3xl">
            {currentRace?.date}
          </h3>
        </div>
      </CSSTransition>
      <div className="">
        <Countdown
          raceTime={raceTime}
          visibility={visibility}
          isSelected={isSelected}
        />
      </div>
    </div>
  );
};

export default Name;
