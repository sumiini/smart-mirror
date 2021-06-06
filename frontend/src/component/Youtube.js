import React,{useEffect, useState} from "react";
import ReactPlayer from 'react-player';
import '../App.css'
import socketio from 'socket.io-client';

const Youtube =()=>{
    const [youtubeId,setYoutubeId]=useState("")
    const [getId,setGetId]=useState("")

    useEffect(()=>{
      const socket = socketio.connect('http://localhost:3001/');
      socket.on("videoID", function async(msg) {
        setGetId(msg)
        console.log(msg)
      });

      getId()
    },[])

    const getId = async(e)=>{
      const res = await axios.post('http://localhost:3001/getdata',{id:"id"})
      console.log(res.data)
    }

    let saveYoutubeId = ()=>{
      setYoutubeId(getId)
      
    }

    useEffect(()=>{
      if(getId!==""){
        saveYoutubeId()
        console.log(getId)
      }
    },[getId])


    return(

    <div className="youtube-class">
      {youtubeId!==""?
      <ReactPlayer  url={'http://www.youtube.com/watch?v='+youtubeId} playing={true} controls={true} />
    :""}
    </div>
   
    )
    
  
}

export default Youtube;