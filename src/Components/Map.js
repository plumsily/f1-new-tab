import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";

const Map = ({ currentRace, trackListImgs }) => {
  return (
    // <div className="flex justify-self-end self-end row-start-3 row-end-4 col-start-3 col-end-4 z-20 backdrop-brightness-75 backdrop-grayscale-[60%] backdrop-blur h-full w-max mb-4 mr-4 px-4 py-4 rounded-2xl shadow-xl sm:max-w-md lg:max-w-max">
    <div className="flex justify-self-end self-end row-start-3 row-end-4 col-start-4 col-end-5 z-20 h-max mb-6 mx-6 sm:w-[25rem] md:w-[30rem] xl:w-[40rem]">
      <img
        className="object-contain saturate-[0.7] drop-shadow-[0_0_10px_rgba(251,146,60,0.2)]"
        src={trackListImgs[0]?.map}
      ></img>
    </div>
  );
};

export default Map;
