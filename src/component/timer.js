import {useContext, useState, useEffect, useRef} from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const red = '#f54e4e';
export default function Timer(props) {
  const [time,setTime] =useState(3); 
  const [second,setsecond] =useState(0); 
  const [pre,setpre] = useState(177);
  
  let x1 ;
  const socket=props.socket;
  useEffect(()=>{
    if(props.x===1){alert('time out')}
    if(props.x==0 && props.isstart==='true'){
     x1=setInterval(()=>{
      setsecond(prev => prev -=1);
        setpre(prev => prev -=1);
    },1000) 
  }
  else{
    clearInterval(x1);
  }
  return () => {
    clearInterval(x1);
  };
   },[props.isstart])
   useEffect(()=>{
    if(second<10){setsecond(second.toString().padStart(2, '0'))};
    if(second===0 && time===0){props.setx(1);props.setisstart('false');}
    else if(second===0){setsecond(59);setTime(x => x-=1);}
    socket.emit('time',{s:second,m:time});
   },[second])
   console.log(pre,time,second);

  const percentage = Math.round((pre*100)/177);
  return (
    <div>
      <CircularProgressbar 
      value={percentage}
      text={time.toString().padStart(2, '0') + ':' + second}
      styles={buildStyles({
        textColor:'#fff',
        pathColor:'#f54e4e',
        tailColor:'rgba(255,255,255,.2)',
      })}
      />
    </div>
  )
}
