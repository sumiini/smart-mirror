import React,{useEffect, useState} from "react";
import ReactPlayer from 'react-player';
import '../App.css'
import socketio from 'socket.io-client';

const Youtube =()=>{
    const [youtubeId,setYoutubeId]=useState("")
    const socket = socketio.connect('http://localhost:3001/');
(() => {
  socket.emit('init', { name: 'bella' });

  socket.on('welcome', (msg) => {
    console.log(msg);
  });

  socket.emit('youtube',{videoID : 'give me a videoID'});
  socket.on('videoID', (msg) => {
    console.log("id"+msg);
    setYoutubeId(msg)
  });
  
})();
    return(

    <div className="youtube-class">
        <ReactPlayer  url={'https://www.youtube.com/watch?v='+youtubeId} playing controls/>
    </div>
   
    )
    
  
}

export default Youtube;