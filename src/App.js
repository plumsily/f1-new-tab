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
  const [totalRound, setTotalRound] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [roundChange, setRoundChange] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [visibility, setVisibility] = useState("visible");
  const [raceWeekTitle, setRaceWeekTitle] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [error, setError] = useState(false);
  const [render, setRender] = useState(false);

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
        shuffleClick(tempSchedule, tempTotalRound);
        setShuffle(true);
      } else {
        setCurrentRace(
          tempSchedule.MRData?.RaceTable.Races.filter(
            (race) => currentDate <= race.date
          )[0]
        );
      }
      setError(false);
      setIsSelected(false);
      setRoundChange(true);
      setTotalRound(tempTotalRound);
      setSchedule(result);
    } catch (error) {
      console.log(error);
      setIsSelected(false);
      setError(true);
      setSchedule({ content: "Something went wrong" });
      let fallbackIndex = Math.floor(Math.random() * circuitList.length);
      setTrackListImgs(circuitList[fallbackIndex]);
      const ranIndex = Math.floor(
        Math.random() * circuitList[fallbackIndex]?.img.length
      );
      setBackgroundImg(circuitList[fallbackIndex]?.img[ranIndex]);
      setRender(false);
      // setIsSelected(true);
      // const timer = setTimeout(() => {
      //   setIsSelected(true);
      // }, 200);
      // return () => clearTimeout(timer);
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
      if (shuffle) {
        setCurrentRound(currentRace?.round);
      }
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
    let tempTrackListImgs = circuitList.filter(
      (circuits) => currentRace?.Circuit?.circuitId === circuits.id
    );
    const img = new Image();
    if (tempTrackListImgs.length) {
      const ranIndex = Math.floor(
        Math.random() * tempTrackListImgs[0]?.img.length
      );
      setBackgroundImg(tempTrackListImgs[0]?.img[ranIndex]);
      img.src = tempTrackListImgs[0]?.img[ranIndex];
    } else if (tempTrackListImgs.img) {
      const ranIndex = Math.floor(
        Math.random() * tempTrackListImgs?.img.length
      );
      setBackgroundImg(tempTrackListImgs?.img[ranIndex]);
      img.src = tempTrackListImgs?.img[ranIndex];
    }
    setTrackListImgs(
      circuitList.filter(
        (circuits) => currentRace?.Circuit?.circuitId === circuits.id
      )
    );
    setRender(true);
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
  // useEffect(() => {
  //   if (trackListImgs.length) {
  //     const ranIndex = Math.floor(Math.random() * trackListImgs[0]?.img.length);
  //     setBackgroundImg(trackListImgs[0]?.img[ranIndex]);
  //   } else if (trackListImgs.img) {
  //     const ranIndex = Math.floor(Math.random() * trackListImgs?.img.length);
  //     setBackgroundImg(trackListImgs?.img[ranIndex]);
  //   }
  // }, [trackListImgs]);
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
  const shuffleClick = (tempSchedule, tempTotalRound) => {
    setIsSelected(false);
    let shuffleIndex = 0;
    if (tempTotalRound) {
      shuffleIndex = Math.floor(Math.random() * parseInt(tempTotalRound));
    } else {
      shuffleIndex = Math.floor(Math.random() * parseInt(totalRound));
    }
    if (tempSchedule) {
      let tempCurrentRace = tempSchedule.MRData?.RaceTable?.Races[shuffleIndex];
      let tempTrackListImgs = circuitList.filter(
        (circuits) => tempCurrentRace?.Circuit?.circuitId === circuits.id
      );
      if (tempTrackListImgs.length) {
        const ranIndex = Math.floor(
          Math.random() * tempTrackListImgs[0]?.img.length
        );
        setBackgroundImg(tempTrackListImgs[0]?.img[ranIndex]);
      } else if (tempTrackListImgs.img) {
        const ranIndex = Math.floor(
          Math.random() * tempTrackListImgs?.img.length
        );
        setBackgroundImg(tempTrackListImgs?.img[ranIndex]);
      }
      setCurrentRace(tempSchedule.MRData?.RaceTable?.Races[shuffleIndex]);
    } else {
      setCurrentRace(schedule.MRData?.RaceTable?.Races[shuffleIndex]);
    }
    // const timer3 = setTimeout(() => {
    //   setIsSelected(true);
    // }, 200);
    // return () => clearTimeout(timer3);
  };

  useEffect(() => {
    const timer3 = setTimeout(() => {
      setIsSelected(true);
    }, 200);
    return () => clearTimeout(timer3);
  }, [backgroundImg]);

  if (render && backgroundImg && currentRace && previousRecord && raceTime) {
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
  } else if (error) {
    return (
      <div className="relative top-0 left-0 grid grid-rows-3 grid-cols-4 h-screen w-screen bg-black z-[-20]">
        <h1 className="relative flex justify-center text-center row-start-2 row-end-3 col-start-2 col-end-4 z-[-10] text-white text-2xl font-medium">
          IMAGES LOADING...
        </h1>
        <Background backgroundImg={backgroundImg} isSelected={true} />
      </div>
    );
  } else {
    <div className="relative top-0 left-0 grid grid-rows-3 grid-cols-4 h-screen w-screen bg-black z-[-20]">
      <h1 className="relative flex justify-center text-center row-start-2 row-end-3 col-start-2 col-end-4 z-[-10] text-white text-2xl font-medium">
        IMAGES LOADING...
      </h1>
    </div>;
  }
}

export default App;
