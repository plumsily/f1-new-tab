import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseApp from "../util/firebase";
import moment from "moment";

const Info = ({ currentRace, previousRecord, previousPit, isLoaded }) => {
  let numDrivers = 0;
  if (isLoaded) {
    for (let key of Object.keys(
      previousPit.MRData?.RaceTable?.Races[0]?.PitStops
    )) {
      if (previousPit.MRData?.RaceTable?.Races[0]?.PitStops[key]?.stop == "1") {
        numDrivers++;
      }
    }
  }
  if (currentRace && previousPit) {
    return (
      // <div className="flex flex-col justify-end w-max mb-4 mx-4 rounded-2xl backdrop-brightness-75 backdrop-grayscale-[60%] backdrop-blur h-full self-end row-start-3 row-end-4 col-start-1 col-end-2 z-20 shadow-xl sm:w-max">
      <div className="flex flex-col justify-end w-full mb-6 mx-6 self-end row-start-3 row-end-4 col-start-1 col-end-2 z-20 uppercase font-medium text-orange-400 sm:text-sm xl:text-lg">
        <h4 className="w-fit mb-4 uppercase font-medium drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-orange-400 z-10">
          Local schedule:
        </h4>
        <h5 className="w-fit drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          {Object.keys(currentRace)[7]}:{" "}
          <span className="text-white">
            {moment
              .utc(
                currentRace[Object.keys(currentRace)[7]]?.date +
                  " " +
                  currentRace[Object.keys(currentRace)[7]]?.time.slice(0, -1)
              )
              .local()
              .format("MM-DD, dddd, HH:mm")}{" "}
          </span>
        </h5>
        <h5 className="w-fit drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          {Object.keys(currentRace)[8]}:{" "}
          <span className="text-white">
            {moment
              .utc(
                currentRace[Object.keys(currentRace)[8]]?.date +
                  " " +
                  currentRace[Object.keys(currentRace)[8]]?.time.slice(0, -1)
              )
              .local()
              .format("MM-DD, dddd, HH:mm")}{" "}
          </span>
        </h5>
        <h5 className="w-fit drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          {Object.keys(currentRace)[9]}:{" "}
          <span className="text-white">
            {moment
              .utc(
                currentRace[Object.keys(currentRace)[9]]?.date +
                  " " +
                  currentRace[Object.keys(currentRace)[9]]?.time.slice(0, -1)
              )
              .local()
              .format("MM-DD, dddd, HH:mm")}{" "}
          </span>
        </h5>
        <h5 className="w-fit drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          {Object.keys(currentRace)[10]}:{" "}
          <span className="text-white">
            {moment
              .utc(
                currentRace[Object.keys(currentRace)[10]]?.date +
                  " " +
                  currentRace[Object.keys(currentRace)[10]]?.time.slice(0, -1)
              )
              .local()
              .format("MM-DD, dddd, HH:mm")}{" "}
          </span>
        </h5>
        <h5 className="w-fit drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          Race:{" "}
          <span className="text-white">
            {moment
              .utc(currentRace?.date + " " + currentRace?.time?.slice(0, -1))
              .local()
              .format("MM-DD, dddd, HH:mm")}{" "}
          </span>
        </h5>

        <p className="mt-4">
          Previous race winner:{" "}
          <span className="text-white">
            {
              previousRecord.MRData?.RaceTable?.Races[
                previousRecord.MRData.total - 1
              ]?.Results[0].Driver.familyName
            }
            ,{" "}
            {
              previousRecord.MRData?.RaceTable?.Races[
                previousRecord.MRData.total - 1
              ]?.Results[0].Constructor.name
            }{" "}
            -{" "}
            {
              previousRecord.MRData?.RaceTable?.Races[
                previousRecord.MRData.total - 1
              ]?.season
            }
          </span>
        </p>
        <p className="mt-4">
          Fastest Lap:{" "}
          <span className="text-white">
            {" "}
            {
              previousRecord.MRData?.RaceTable?.Races[
                previousRecord.MRData.total - 1
              ]?.Results[0].FastestLap.Time.time
            }
          </span>
        </p>
        <p className="mt-4">
          Average pit stop count:{" "}
          <span className="text-white">
            {(previousPit.MRData?.total / numDrivers).toFixed(2)}
          </span>
        </p>
        {/* <p className="mt-4 w-full">
          The Marina Bay Circuit arrived on the scene in 2008. A street track
          with the city's famous skyline as its spectacular backdrop, the
          initial circuit plan by Herman Tilke was refined by KBR Inc, while the
          event has quickly established itself as one of the standouts on the F1
          calendar.
        </p> */}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Info;
