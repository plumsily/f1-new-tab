import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "./util/firebase";
import "./App.css";

import Background from "./Components/Background";
import Name from "./Components/Name";
import Map from "./Components/Map";
import Countdown from "./Components/Countdown";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [currentRace, setCurrentRace] = useState([]);
  const [raceTime, setRaceTime] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [trackListImgs, setTrackListImgs] = useState([]);

  const db = getDatabase(firebaseApp);

  const updateSchedule = async () => {
    try {
      const response = await fetch("http://ergast.com/api/f1/current.json");
      const result = await response.json();
      setSchedule(result);
    } catch (error) {
      console.log(error);
      setSchedule({ content: "Something went wrong" });
    }
  };

  useEffect(() => {
    updateSchedule();
    setCurrentDate(moment().format("YYYY-MM-DD, HH:mm:ss"));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(moment().format("YYYY-MM-DD, HH:mm:ss"));
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentDate]);

  useEffect(() => {
    setCurrentRace(
      schedule.MRData?.RaceTable.Races.filter(
        (race) => currentDate <= race.date
      )[0]
    );
    setRaceTime(
      moment
        .utc(
          currentRace?.Qualifying?.date +
            " " +
            currentRace?.Qualifying?.time.slice(0, -1)
        )
        .local()
        .format("YYYY-MM-DD, HH:mm:ss")
    );
  }, [schedule]);

  useEffect(() => {
    const circuitRef = ref(db, "/circuits");

    onValue(circuitRef, (snapshot) => {
      const circuit = snapshot.val();
      const circuitList = [];

      for (let id in circuit) {
        circuitList.push({ id, ...circuit[id] });
      }
      setTrackListImgs(
        circuitList.filter(
          (circuits) => currentRace?.Circuit?.circuitId === circuits.id
        )
      );
    });
  }, [currentRace]);

  return (
    <div className="App relative grid grid-rows-3 grid-cols-3 h-screen bg-black">
      {/* <div className="row-start-4 row-end-5 col-start-1 col-end-4 backdrop-blur backdrop-brightness-90 backdrop-grayscale z-10"></div> */}
      <Background currentRace={currentRace} trackListImgs={trackListImgs} />
      <Name currentRace={currentRace} />
      <Map currentRace={currentRace} trackListImgs={trackListImgs} />
      <Countdown
        currentRace={currentRace}
        currentDate={currentDate}
        raceTime={raceTime}
      />
    </div>
  );
}

export default App;
