import React from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

import "./History.css";

const History = ({
  schedule,
  currentRace,
  handleClick,
  currentRound,
  shuffleClick,
  shuffle,
}) => {
  const rounds = [];
  if (shuffle) {
    rounds.push(
      <button
        onClick={() => {
          shuffleClick();
        }}
        className={`flex self-end items-center h-6 ${
          shuffle ? "text-red-500" : "text-white/40 hover:text-red-500"
        } text-red-500 hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(0,0,0,0.4)] text-lg`}
      >
        <FontAwesomeIcon icon={faShuffle} />
      </button>
    );
  } else {
    rounds.push(
      <button
        onClick={() => {
          shuffleClick();
        }}
        className="flex self-end items-center h-6 text-white/40 hover:text-red-500 hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(0,0,0,0.4)] text-lg"
      >
        <FontAwesomeIcon icon={faShuffle} />
      </button>
    );
  }
  for (let i = 0; i < schedule?.MRData?.total; i++) {
    if (i + 1 == currentRace?.round) {
      rounds.push(
        <div
          onClick={(event) => handleClick(i)}
          key={i}
          className="group flex flex-col h-max w-2 justify-center items-center drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        >
          <span className="mb-1.5 opacity-0 group-hover:opacity-100 text-red-500 font-bold transition-all ">
            {i + 1}
          </span>
          <div className="w-2 h-6 rounded bg-red-500/60 group-hover:bg-red-500 group-hover:scale-125   transition-all cursor-pointer backdrop-blur-lg"></div>
        </div>
      );
    } else {
      // if (i + 1 == currentRound) {
      //   rounds.push(
      //     <div
      //       onClick={(event) => handleClick(i)}
      //       key={i}
      //       className="group flex flex-col h-max w-2 justify-center items-center drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
      //     >
      //       <span className="mb-1.5 opacity-0 group-hover:opacity-100 text-red-500 font-bold transition-all ">
      //         {i + 1}
      //       </span>
      //       <div className="w-2 h-6 rounded bg-lime-400/60 group-hover:bg-red-500 group-hover:scale-125   transition-all cursor-pointer backdrop-blur-lg"></div>
      //     </div>
      //   );
      // } else {
      rounds.push(
        <div
          onClick={(event) => handleClick(i)}
          key={i}
          className="group flex flex-col h-max w-2 justify-center items-center drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        >
          <span className="mb-1.5 opacity-0 group-hover:opacity-100 text-red-500 font-bold transition-all ">
            {i + 1}
          </span>
          <div className="w-2 h-6 rounded bg-white/40 group-hover:bg-red-500 group-hover:scale-125 transition-all cursor-pointer backdrop-blur-lg"></div>
        </div>
      );
      // }
    }
  }
  rounds.push(
    <div className="flex self-end items-center w-12 h-6 text-white/40 drop-shadow-[0_0_8px_rgba(0,0,0,0.4)] text-xs uppercase leading-tight">
      {schedule.MRData?.RaceTable?.season} Season
    </div>
  );
  return (
    <div className="flex flex-col justify-self-center self-end items-center row-start-3 row-end-4 col-start-2 col-end-4 pt-2 pb-8 w-1/2">
      <CSSTransition in={true} timeout={2200} classNames="history" appear>
        <div className="flex flex-row w-full justify-self-center self-center items-center justify-between z-20">
          {rounds}
        </div>
      </CSSTransition>
    </div>
  );
};

export default History;
