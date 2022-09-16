import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";

// import db from "../utils/firebase";

const Background = ({ currentRace, trackListImgs }) => {
  return (
    <div className="relative flex justify-center row-start-1 row-end-4 col-start-1 col-end-5 z-0">
      <img
        className="object-cover h-full w-full"
        src={trackListImgs[0]?.img}
      ></img>
      <div className="absolute h-screen w-screen top-0 left-0 bg-gradient-to-t from-black/95 "></div>
    </div>
  );
};

export default Background;
