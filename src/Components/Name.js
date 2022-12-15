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
        className={`${visibility} text w-max text-white z-10 sm:text-lg sm:mb-3 xl:mb-7 xl:text-xl`}
      >
        It's Race Week
      </h1>
    );
  } else {
    if (visibility == "visible") {
      nextRace.push(
        <h1
          className={`${visibility} text w-max text-white z-10 sm:text-lg sm:mb-3 xl:mb-7 xl:text-xl`}
        >
          Next Formula 1 Race
        </h1>
      );
    }
  }
  return (
    <div className="flex flex-col justify-self-center self-center items-center row-start-3 row-end-4 col-start-1 col-end-5 pt-12">
      <CSSTransition
        in={isSelected}
        timeout={2200}
        classNames="name"
        appear
        unmountOnExit
      >
        <div className="text flex flex-col justify-self-center self-center items-center z-20 mb-16 uppercase font-bold drop-shadow-[0_0_100px_rgba(0,0,0,0)]">
          {nextRace}
          <h1 className="w-max text-white sm:text-4xl sm:mb-2 xl:mb-6 xl:text-5xl drop-shadow-[0_0_1px_rgba(163,230,53,0.5)]">
            {currentRace?.raceName}
          </h1>
          <h2 className="w-fit text-lime-400 sm:text-xl sm:mb-1 xl:mb-2 xl:text-2xl">
            {currentRace?.Circuit?.circuitName}
          </h2>
          <h3 className="w-fit text-lime-400 sm:text-xl xl:text-2xl">
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
