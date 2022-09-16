import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "./util/firebase";
import "./App.css";

import Background from "./Components/Background";
import Info from "./Components/Info";
import Map from "./Components/Map";
import Countdown from "./Components/Countdown";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [currentRace, setCurrentRace] = useState([]);
  const [previousRecord, setPreviousRecord] = useState([]);
  const [previousPit, setPreviousPit] = useState([]);
  const [raceTime, setRaceTime] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [trackListImgs, setTrackListImgs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
  const updatePit = async () => {
    try {
      const response = await fetch(
        `http://ergast.com/api/f1/${
          previousRecord?.MRData?.RaceTable?.Races[
            previousRecord?.MRData?.total - 1
          ]?.season
        }/${
          previousRecord?.MRData?.RaceTable?.Races[
            previousRecord?.MRData?.total - 1
          ]?.round
        }/pitstops.json?limit=60`
      );
      const result = await response.json();
      setPreviousPit(result);
    } catch (error) {
      console.log(error);
      setPreviousPit({ content: "Something went wrong" });
    }
  };

  useEffect(() => {
    updateSchedule();
    setCurrentDate(moment().format("YYYY-MM-DD, HH:mm:ss"));
  }, []);

  useEffect(() => {
    updateRecord();
  }, [currentRace]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      updatePit();
    }, 100);
    const timer2 = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
    // updatePit();
  }, [previousRecord]);

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
    const timer = setTimeout(() => {
      setCurrentDate(moment().format("YYYY-MM-DD, HH:mm:ss"));
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentDate]);

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
    <div className="App relative grid grid-rows-3 grid-cols-4 h-screen bg-black">
      <Background currentRace={currentRace} trackListImgs={trackListImgs} />
      <Info
        currentRace={currentRace}
        previousRecord={previousRecord}
        previousPit={previousPit}
        isLoaded={isLoaded}
      />
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
