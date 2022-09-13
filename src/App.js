import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import moment from "moment";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "./util/firebase";
import "./App.css";

import Background from "./Components/Background";
import Name from "./Components/Name";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [currentRace, setCurrentRace] = useState([]);
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
    setCurrentDate(moment().format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    setCurrentRace(
      schedule.MRData?.RaceTable.Races.filter(
        (race) => currentDate <= race.date
      )[0]
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
    <div className="App flex justify-center">
      <Name currentRace={currentRace} />
      <Background currentRace={currentRace} trackListImgs={trackListImgs} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
