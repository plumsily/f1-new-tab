import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import moment from "moment";
import "./App.css";

import Background from "./Components/Background";

function App() {
  const [schedule, setSchedule] = useState([]);
  const [currentRace, setCurrentRace] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

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
    console.log(currentRace);
  }, [schedule]);

  return (
    <div className="App">
      <Background currentRace={currentRace} />
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
