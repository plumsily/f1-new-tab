import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";

// import db from "../utils/firebase";

const Background = ({ currentRace, trackListImgs }) => {
  //   const db = getDatabase(firebaseApp);
  //   const [trackList, setTrackList] = useState([]);

  //   useEffect(() => {
  //     const circuitRef = ref(db, "/circuits");

  //     onValue(circuitRef, (snapshot) => {
  //       const circuit = snapshot.val();
  //       const newCircuit = [];

  //       for (let id in circuit) {
  //         newCircuit.push({ id, ...circuit[id] });
  //       }
  //       setTrackList(newCircuit);
  //     });
  //   }, [db]);

  return (
    <div className="relative flex justify-center top-0 left-0 h-screen w-screen">
      {/* <h1 className="absolute left-5 top-5 text-2xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-white z-10">
        {currentRace?.raceName}
      </h1>
      <h2 className="absolute left-5 mt-3 text-xl uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-white z-10">
        {currentRace?.raceName}
      </h2> */}
      <img
        className="object-cover h-screen w-screen"
        src={trackListImgs[0]?.img}
      ></img>
      {/* {trackList.map((circuit, index) => {
        return (
          <p key={index}>
            {circuit.name}
            <img src={circuit.img}></img>
          </p>
        );
      })} */}
    </div>
  );
  //   const track = db.collection("circuits").doc("italy");
  //   const trackImg = track.get("background-img").then((doc) => {
  //     if (!doc.exists) {
  //       console.log("doesn't exist");
  //     } else {
  //       console.log("Document data: ", doc.data());
  //     }
  //   });

  //   return (
  //     <div className="absolute top-0 left-0 h-screen w-screen bg-blue-400">
  //       <img src={trackImg}></img>
  //     </div>
  //   );
};

export default Background;
