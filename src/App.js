import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "./util/firebase";
import "./App.css";

import Background from "./Components/Background";
import Info from "./Components/Info";
import Map from "./Components/Map";
import Name from "./Components/Name";
import History from "./Components/History";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [currentRace, setCurrentRace] = useState([]);
  const [previousRecord, setPreviousRecord] = useState([]);
  const [raceTime, setRaceTime] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [trackListImgs, setTrackListImgs] = useState([]);
  const [backgroundImg, setBackgroundImg] = useState("");
  const [currentRound, setCurrentRound] = useState("");
  const [roundChange, setRoundChange] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const [visibility, setVisibility] = useState("visible");

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
  const updateRecord = async () => {
    try {
      const response = await fetch(
        `http://ergast.com/api/f1/circuits/${currentRace?.Circuit?.circuitId}/results/1.json?limit=100`
      );
      const result = await response.json();
      setPreviousRecord(result);
    } catch (error) {
      console.log(error);
      setPreviousRecord({ content: "Something went wrong" });
    }
  };

  useEffect(() => {
    updateSchedule();
    setCurrentDate(moment().format("YYYY-MM-DD, HH:mm:ss"));
  }, []);

  useEffect(() => {
    setCurrentRace(
      schedule.MRData?.RaceTable.Races.filter(
        (race) => currentDate <= race.date
      )[0]
    );
    setRoundChange(true);
  }, [schedule]);

  useEffect(() => {
    setRoundChange(false);
    setCurrentRound(currentRace?.round);
  }, [roundChange]);

  useEffect(() => {
    updateRecord();
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
    if (parseInt(currentRace?.round) < parseInt(currentRound)) {
      setVisibility("invisible");
    } else {
      setVisibility("visible");
    }
  }, [currentRace]);

  useEffect(() => {
    const ranIndex = Math.floor(Math.random() * trackListImgs[0]?.img.length);
    setBackgroundImg(trackListImgs[0]?.img[ranIndex]);
  }, [trackListImgs]);

  const handleClick = (round) => {
    setIsSelected(false);
    setCurrentRace(schedule.MRData?.RaceTable?.Races[round]);
    const timer2 = setTimeout(() => {
      setIsSelected(true);
    }, 200);
    return () => clearTimeout(timer2);
  };

  if (trackListImgs && currentRace && previousRecord && raceTime) {
    return (
      <div className="relative top-0 left-0 grid grid-rows-3 grid-cols-4 h-screen w-screen bg-black">
        <Background backgroundImg={backgroundImg} isSelected={isSelected} />
        <Info
          currentRace={currentRace}
          previousRecord={previousRecord}
          isSelected={isSelected}
          visibility={visibility}
        />
        <Map trackListImgs={trackListImgs} isSelected={isSelected} />
        <Name
          currentRace={currentRace}
          raceTime={raceTime}
          isSelected={isSelected}
          visibility={visibility}
        />
        <History
          schedule={schedule}
          currentRace={currentRace}
          handleClick={handleClick}
          isSelected={isSelected}
          currentRound={currentRound}
        />
      </div>
    );
  } else {
    return (
      <div className="relative top-0 left-0 h-screen w-screen bg-black"></div>
    );
  }
}

export default App;
