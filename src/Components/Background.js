import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import "./Background.css";

const Background = ({ backgroundImg, isSelected }) => {
  const img = new Image();
  img.src = backgroundImg;
  return (
    <CSSTransition
      in={isSelected}
      timeout={1300}
      classNames="background"
      appear
    >
      <div className="relative flex justify-center row-start-1 row-end-4 col-start-1 col-end-5 z-0">
        <img className="w-full object-cover" src={backgroundImg}></img>
        <div className="absolute h-screen w-screen top-0 left-0 bg-gradient-radial from-transparent  to-black/80 "></div>
      </div>
    </CSSTransition>
  );
};

export default Background;
