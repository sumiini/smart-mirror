import './App.css';

import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import useFullscreen from './useFullscreen';
import Calendars from './component/Calendars';
import Weather from './component/Weather';
import Youtbue from './component/Youtube';

function App() {

  let currentTime;
  //const [seconds, setSeconds] = useState(0);

  function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds=(date.getSeconds());

    currentTime= `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    ReactDOM.render(currentTime, document.getElementById("clock"));
  }
  function init(){
    getTime();
    setInterval(getTime,1000);
  }
  init();


  return (
    <span className="full">
      <Weather></Weather>
      <Calendars></Calendars>
      <Youtbue></Youtbue>
    </span>
  );
}

export default App;
