import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import "./History.css";

const History = ({ schedule, currentRace, handleClick }) => {
  const rounds = [];
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
      rounds.push(
        <div
          onClick={(event) => handleClick(i)}
          key={i}
          className="group flex flex-col h-max w-2 justify-center items-center drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        >
          <span className="mb-1.5 opacity-0 group-hover:opacity-100 text-red-500 font-bold transition-all ">
            {i + 1}
          </span>
          <div className="w-2 h-6 rounded bg-gray-500/50 group-hover:bg-red-500 group-hover:scale-125 transition-all cursor-pointer backdrop-blur-lg"></div>
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col justify-self-center self-start items-center row-start-1 row-end-2 col-start-2 col-end-4 pt-2 w-1/2">
      <CSSTransition in={true} timeout={1000} classNames="history" appear>
        <div className="flex flex-row w-full justify-self-center self-center items-center justify-between z-20">
          {rounds}
        </div>
      </CSSTransition>
    </div>
  );
};

export default History;
