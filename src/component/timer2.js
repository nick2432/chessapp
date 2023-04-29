import {useContext, useState, useEffect, useRef} from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function Timer2(props) {
    const socket=props.socket;
    const [time,setTime] =useState(0); 
    const [second,setsecond] =useState(0); 
    const [pre,setpre] = useState(177);
    var sec=9;
    var min=2;
    useEffect(()=>{
        socket.on("tx",(data)=>{
         setsecond(data.s);
         setTime(data.m);
         if(data.s===0 && data.m===0){alert('you win')}
         setpre(prev => prev -=1);
        });
        console.log(sec,min,"lnd")
    },[socket]) 
      const percentage = Math.round((pre*100)/177);
  return (
    <div>
      <CircularProgressbar 
      value={percentage}
      text={time.toString().padStart(2, '0') + ':' + second.toString().padStart(2, '0')}
      styles={buildStyles({
        textColor:'#fff',
        pathColor:'#f54e4e',
        tailColor:'rgba(255,255,255,.2)',
      })}
      />
    </div>
  )
}
