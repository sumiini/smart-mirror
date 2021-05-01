import React,{useState,useEffect} from "react";
import ReactPlayer from 'react-player';
import '../App.css'
import socketio from 'socket.io-client';

const Youtube =()=>{
const socket = socketio.connect('http://localhost:3001/button');
const [id,setId] = useState('')
// (() => {
  
  
// })();


useEffect(()=>{
  
  socket.on('connection', function () {
    socket.on('socket',function(data){
      setId(data)
      
    });
  })
  
  console.log(id)

},[id])


    return(

    <div className="youtube-class">
        <div style={{color:"white"}}>{id}</div>
        <ReactPlayer  url={'https://www.youtube.com/watch?v='+id} playing controls/>
        
    </div>
   
    )
    
  
}

export default Youtube;