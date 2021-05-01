import React,{useState} from "react";
import '../App.css'

const Calendars =()=>{
    
    const [date,setDate]=useState(new Date())
   console.log(date)
    return(
        <div className="calendar">
            {/* <Calendar className="react-calendar" value={date}/> */}
            <div style={{fontFamily:"Jua",fontSize:"20px",color:"white"}}>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일</div>
        </div>
    )
    
  
}

export default Calendars;