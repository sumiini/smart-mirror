import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player';
import React, { useRef } from "react";
import ReactDOM from "react-dom";

import useFullscreen from './useFullscreen';

function App() {

  const onFullS = (isFull) => {
    console.log(isFull ? "We are full" : "We are small");
  };
  const { element, triggerFull, exitFull } = useFullscreen(onFullS);


  return (
    <div className="full">
    <div className="youtube-class">
     
      <ReactPlayer  url='https://www.youtube.com/watch?v=N8oTzoZRatc' playing controls/>
    </div>
     
     
    </div>
  );
}

export default App;
