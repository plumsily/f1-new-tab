import React from "react";
import { CSSTransition } from "react-transition-group";
import "./Map.css";

const Map = ({ trackListImgs, isSelected }) => {
  return (
    <CSSTransition in={isSelected} timeout={2200} classNames="map" appear>
      <div className="flex justify-self-end self-end row-start-3 row-end-4 col-start-4 col-end-5 z-20 h-max mb-6 mx-6 sm:w-[20rem] md:w-[30rem] xl:w-[40rem]">
        <img
          className="object-contain saturate-[0.8] drop-shadow-[0_0_10px_rgba(163,250,53,0.4)]"
          src={trackListImgs[0]?.map}
        ></img>
      </div>
    </CSSTransition>
  );
};

export default Map;
