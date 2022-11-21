import React, { useState, useEffect } from "react";
import moment from "moment";
import { firebaseApp, circuitList } from "./util/firebase";
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
  const [totalRound, setTotalRound] = useState("");
  const [currentRound, setCurrentRound] = useState("");
  const [roundChange, setRoundChange] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const [visibility, setVisibility] = useState("visible");
  const [raceWeekTitle, setRaceWeekTitle] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  //Initial fetch for the F1 2022 Schedule.
  const updateSchedule = async () => {
    try {
      const response = await fetch("https://ergast.com/api/f1/current.json");
      const result = await response.json();
      let tempSchedule = result;
      let tempTotalRound = tempSchedule.MRData?.total;
      if (
        moment.utc().format("YYYY-MM-DD") >
        moment
          .utc(
            tempSchedule.MRData?.RaceTable.Races[
              tempSchedule.MRData?.RaceTable.Races.length - 1
            ].date
          )
          .format("YYYY-MM-DD")
      ) {
        shuffleClick();
        setShuffle(true);
      } else {
        setCurrentRace(
          tempSchedule.MRData?.RaceTable.Races.filter(
            (race) => currentDate <= race.date
          )[0]
        );
      }
      setRoundChange(true);
      setTotalRound(tempTotalRound);
      setSchedule(result);
    } catch (error) {
      console.log(error);
      setSchedule({ content: "Something went wrong" });
    }
  };
  //Secondary fetch for the most recent race results for current race.
  const updateRecord = async () => {
    try {
      const response = await fetch(
        `https://ergast.com/api/f1/circuits/${currentRace?.Circuit?.circuitId}/results/1.json?limit=100`
      );
      const result = await response.json();
      setPreviousRecord(result);
      //parse all info here
    } catch (error) {
      console.log(error);
      setPreviousRecord({ content: "Something went wrong" });
    }
  };
  //Initial mount
  useEffect(() => {
    setCurrentDate(moment().format("YYYY-MM-DD, HH:mm:ss"));
    updateSchedule();
  }, []);
  //Sets both current round and dependency for setting the round state. If the 2022 season has ended, the page will start with a random race to display.
  // useEffect(() => {
  //   if (
  //     moment.utc().format("YYYY-MM-DD") >
  //     moment
  //       .utc(
  //         schedule.MRData?.RaceTable.Races[
  //           schedule.MRData?.RaceTable.Races.length - 1
  //         ].date
  //       )
  //       .format("YYYY-MM-DD")
  //   ) {
  //     shuffleClick();
  //     setShuffle(true);
  //   } else {
  //     setCurrentRace(
  //       schedule.MRData?.RaceTable.Races.filter(
  //         (race) => currentDate <= race.date
  //       )[0]
  //     );
  //   }
  //   setRoundChange(true);
  //   setTotalRound(schedule.MRData?.total);
  // }, [schedule]);
  //Sets the static state of the current round without being dependent on state changes for current race
  useEffect(() => {
    setRoundChange(false);
    setCurrentRound(currentRace?.round);
  }, [roundChange]);
  //Sets info, map, and background data for currently selected race.
  useEffect(() => {
    updateRecord();
    setRaceTime(
      moment
        .utc(currentRace?.date + " " + currentRace?.time?.slice(0, -1))
        .local()
        .format("YYYY-MM-DD, HH:mm:ss")
    );
    //current race's background images
    setTrackListImgs(
      circuitList.filter(
        (circuits) => currentRace?.Circuit?.circuitId === circuits.id
      )
    );
  }, [currentRace]);
  //toggling to show countdown and schedule for passed races
  useEffect(() => {
    if (parseInt(currentRace?.round) < parseInt(currentRound)) {
      setVisibility("invisible");
    } else {
      if (moment().format("YYYY-MM-DD, HH:mm:ss") > raceTime) {
        setVisibility("invisible");
      } else if (
        moment
          .utc(currentRace?.date + " " + currentRace?.time?.slice(0, -1))
          .subtract(7, "d") <= moment()
      ) {
        setRaceWeekTitle(true);
        setVisibility("visible");
      } else {
        setRaceWeekTitle(false);
        setVisibility("visible");
      }
    }
  }, [raceTime]);
  //Sets random index to shuffle background images.
  useEffect(() => {
    const ranIndex = Math.floor(Math.random() * trackListImgs[0]?.img.length);
    setBackgroundImg(trackListImgs[0]?.img[ranIndex]);
  }, [trackListImgs]);
  //Updates current race info data when user clicks on the selected round.
  const handleClick = async (round) => {
    setIsSelected(false);
    //call updaterace
    //await updaterecord()
    setCurrentRace(schedule.MRData?.RaceTable?.Races[round]);
    if (shuffle) {
      setCurrentRound(round + 1);
    }
    const timer2 = setTimeout(() => {
      setIsSelected(true);
    }, 200);
    return () => clearTimeout(timer2);
  };
  //Shuffles the current round to display
  const shuffleClick = () => {
    setIsSelected(false);
    const shuffleIndex = Math.floor(Math.random() * parseInt(totalRound));
    setCurrentRace(schedule.MRData?.RaceTable?.Races[shuffleIndex]);
    const timer3 = setTimeout(() => {
      setIsSelected(true);
    }, 200);
    return () => clearTimeout(timer3);
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
          raceWeekTitle={raceWeekTitle}
        />
        <History
          schedule={schedule}
          currentRace={currentRace}
          handleClick={handleClick}
          currentRound={currentRound}
          shuffleClick={shuffleClick}
          shuffle={shuffle}
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
