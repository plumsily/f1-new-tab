import React from "react";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import "./Info.css";

const Info = ({ currentRace, previousRecord, isSelected, visibility }) => {
  return (
    <CSSTransition
      in={isSelected}
      timeout={2200}
      classNames="info"
      appear
      unmountOnExit
    >
      <div className="flex flex-col justify-end w-full mb-6 mx-6 self-end row-start-3 row-end-4 col-start-1 col-end-2 z-20 uppercase font-semibold text-lime-400 drop-shadow-[0_0_10px_rgba(0,0,0,1)] sm:text-sm xl:text-lg">
        <div className={`${visibility}`}>
          <h4 className="w-fit mb-4 z-10">Local schedule:</h4>
          <h5 className="w-fit">
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
          <h5 className="w-fit">
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
          <h5 className="w-fit">
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
          <h5 className="w-fit">
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
          <h5 className="w-fit">
            Race:{" "}
            <span className="text-white">
              {moment
                .utc(currentRace?.date + " " + currentRace?.time?.slice(0, -1))
                .local()
                .format("MM-DD, dddd, HH:mm")}{" "}
            </span>
          </h5>
        </div>

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
      </div>
    </CSSTransition>
  );
};

export default Info;
