import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";

const Name = ({ currentRace }) => {
  return (
    <div className="relative flex flex-col items-end top-0 left-0 h-screen w-max px-3 py-3 bg-black">
      <h1 className="w-max text-2xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-white z-10">
        {currentRace?.raceName}
      </h1>
      <h2 className="w-fit mt-1 text-l uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10">
        {currentRace?.Circuit.circuitName}
      </h2>
      <h3 className="w-fit text-l uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10">
        {currentRace?.date}
      </h3>
    </div>
  );
};

export default Name;
