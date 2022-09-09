import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Background from "./Components/Background";

function App() {
  // const [schedule,setSchedule] = useState<any>();

  // useEffect(()=>{
  //   updateSchedule();
  // },[]);

  // const updateSchedule = async() => {
  //   const requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
  //   const convert = require('xml2js');
  //   // let xml = undefined;
  //   fetch("http://ergast.com/api/f1/current", {method: 'GET',redirect: 'follow'})
  //     .then(response => response.text())
  //     .then(result => {
  //       convert.parseString(result,(err:any,res:any)=>{
  //         if(err){
  //           throw err;
  //         }
  //         const json = JSON.stringify(result,null,4);
  //         setSchedule(json);
  //       })
  //     })
  //     .catch(error => console.log('error', error));

  return (
    <div className="App">
      <Background />
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
