import React, { useState, useEffect } from "react";
import moment from "moment";
import { CSSTransition } from "react-transition-group";

import "./Countdown.css";

var momentDurationFormatSetup = require("moment-duration-format");

const Countdown = ({ currentRace, raceTime }) => {
  const [realTime, setRealTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setRealTime(moment().format("YYYY-MM-DD, HH:mm:ss"));
    };
    let int = setInterval(tick, 1000);
    return () => clearInterval(int);
  });
  return (
    <CSSTransition in={realTime} timeout={1500} classNames="countDown" appear>
      <div className="flex flex-col justify-self-center self-center items-center z-20">
        <div className="text-white font-medium uppercase drop-shadow-[0_0_10px_rgba(0,0,0,1)] sm:text-4xl xl:text-5xl">
          {realTime
            ? moment
                .duration(moment(raceTime).diff(moment(realTime)))
                .format("DD [d] HH [h] mm [m] ss [s]")
            : ""}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Countdown;
