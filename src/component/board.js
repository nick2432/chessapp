import React, { useState, useEffect } from 'react'
import "./board.css"

import Box from "./box.js";
import { getElementError } from '@testing-library/react';
import Timer from "./timer";
import Timer2 from "./timer2";
import snd from "./8d82b5_MKD_Chess_Checkmate_Sound_Effect.mp3";
const columns = [1,2,3,4,5,6,7,8];
const rows = [1,2,3,4,5,6,7,8];
  const pieces=[];
  for(var i=1;i<=8;i++){
    pieces.push({t:'dp',key:`d${2}${i}`,image:require('../images/Chess_pdt60.png'),x:2,y:i,c:'d'});
  }
  for(var i=3;i<=6;i++){
    for(var j=1;j<=8;j++){
      if((i+j)%2===0){
        pieces.push({t:'n',key:`n${i}${j}`,image:null,x:i,y:j,c:'n'});
      }
    }
  }
  for(var i=3;i<=6;i++){
    for(var j=1;j<=8;j++){
      if((i+j)%2!=0){
        pieces.push({t:'n',key:`n${i}${j}`,image:null,x:i,y:j,c:'n'});
      }
    }
  }
   pieces.push({t:'dr',key:`d${1}${1}`,image:require('../images/Chess_rdt60.png'),x:1,y:1,c:'d'});
  pieces.push({t:'dr',key:`d${1}${8}`,image:require('../images/Chess_rdt60.png'),x:1,y:8,c:'d'});
  pieces.push({t:'db',key:`d${1}${3}`,image:require('../images/Chess_bdt60.png'),x:1,y:3,c:'d'});
  pieces.push({t:'db',key:`d${1}${6}`,image:require('../images/Chess_bdt60.png'),x:1,y:6,c:'d'});
  pieces.push({t:'dk',key:`d${1}${2}`,image:require('../images/Chess_ndt60.png'),x:1,y:2,c:'d'});
  pieces.push({t:'dk',key:`d${1}${7}`,image:require('../images/Chess_ndt60.png'),x:1,y:7,c:'d'});
  pieces.push({t:'dq',key:`d${1}${4}`,image:require('../images/Chess_qdt60.png'),x:1,y:4,c:'d'});
  pieces.push({t:'dki',key:`d${1}${5}`,image:require('../images/Chess_kdt60.png'),x:1,y:5,c:'d'});
  pieces.push({t:'lr',key:`l${8}${8}`,image:require('../images/Chess_rlt60.png'),x:8,y:8,c:'l'});
  pieces.push({t:'lr',key:`l${8}${1}`,image:require('../images/Chess_rlt60.png'),x:8,y:1,c:'l'});
  pieces.push({t:'lb',key:`l${8}${3}`,image:require('../images/Chess_blt60.png'),x:8,y:3,c:'l'});
  pieces.push({t:'lb',key:`l${8}${6}`,image:require('../images/Chess_blt60.png'),x:8,y:6,c:'l'});
  pieces.push({t:'lk',key:`l${8}${2}`,image:require('../images/Chess_nlt60.png'),x:8,y:2,c:'l'});
  pieces.push({t:'lk',key:`l${8}${7}`,image:require('../images/Chess_nlt60.png'),x:8,y:7,c:'l'});
  pieces.push({t:'lq',key:`l${8}${4}`,image:require('../images/Chess_qlt60.png'),x:8,y:4,c:'l'});
  pieces.push({t:'lki',key:`l${8}${5}`,image:require('../images/Chess_klt60.png'),x:8,y:5,c:'l'});
  for(var i=1;i<=8;i++){
    pieces.push({t:'lp',key:`l${7}${i}`,image:require('../images/Chess_plt60.png'),x:7,y:i,c:'l'});
  }
  let clr = {1:-1,2:-1,3:-1,4:-1};
export default function Board(props) {
  const [pi,setChange] = useState(pieces);
  const [x,setx] = useState(1);
  const [y,sety] = useState(5);
  const [xw,setxw] = useState(8);
  const [yw,setyw] = useState(5);
  const [val,setval] = useState(0);
  const [t,sett] = useState(0);
  const [lose,setlose] = useState(0);
  const [win,setwin] = useState(0);
  const [xx,setxx]=useState(-1);
  const [yy,setyy]=useState(-1);
  const [colr,setcolr]=useState('')
  const [cl,setcl]=useState(1)
  const [isstart,setisstart]=useState('false');
  const [xt,setxt]=useState(0);
  const socket=props.socket;
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setChange(data);
    });
  },[socket])
  useEffect(()=>{
    socket.on("receive_message1",(data)=>{
      if(data===1){
        setisstart('true');
        props.setblack(1);
      }
      else{
        props.setblack(0);
       
        setval(1);
      }
      props.seta(1);
      const x=document.getElementById('apptnb');
      const x2=document.getElementById('apptnw');
      x.remove();x2.remove();
      const tim2=document.getElementById('timer2');
    tim2.style.display="inline-block";
      const x1=document.getElementById('column');
      x1.style.display="inline-block";
      const tim=document.getElementById('timer');
      tim.style.display="inline-block";
      const y1=document.getElementById('chessbd');
      y1.style.opacity='100%';
    });
  },[socket])
    if(lose===1){
      const x1=document.getElementById('lose');
      x1.style.display="inline-block";
      new Audio(snd).play();
    }
   
    if(win===1){
      const x1=document.getElementById('win');
      x1.style.display="inline-block";
      new Audio(snd).play();
    }
  const gotob=()=>{
    socket.emit("send_message", pi);
    socket.emit("send_message1", 1);
    setval(1);
    const x=document.getElementById('apptnb');
    const x2=document.getElementById('apptnw');
    if(x!=null){
    x.disabled=1;
    }
    const x1=document.getElementById('column');
    x1.style.display="inline-block";
    const tim2=document.getElementById('timer2');
    tim2.style.display="inline-block";
    const tim=document.getElementById('timer');
    tim.style.display="inline-block";
    const y1=document.getElementById('chessbd');
    y1.style.opacity='100%';
    
    props.seta(1);
    x.remove();x2.remove();
  }
  const gotow=()=>{
    socket.emit("send_message1", 0);
    const x=document.getElementById('apptnb');
    const x2=document.getElementById('apptnw');
    if(x!=null){
      setisstart('true');
      x2.disabled=1;
      }
      const tim2=document.getElementById('timer2');
    tim2.style.display="inline-block";
      const tim=document.getElementById('timer');
    tim.style.display="inline-block";
      const y1=document.getElementById('chessbd');
      y1.style.opacity='100%';
    const x1=document.getElementById('column');
    x1.style.display="inline-block";
    props.seta(1);
    x.remove();x2.remove();
  }
  return (
    <>
    <div id='yt'></div>
    <div id='xt'></div>
    <div id='timer'><Timer x={xt} setx={setxt}setisstart={setisstart} isstart={isstart} socket={socket}/></div>
    <div id='chessbd'>
      <button id='apptnb' onClick={gotob} type='button'>BLACK</button>
      <button id='apptnw' onClick={gotow} type='button'>WHITE</button>
      <div id={`tabl${val}`}>
            <div id='column'>
                {
                    rows.map((row)=>{
                        {
                            return(<div id={`row${val}`}>
                            {columns.map((column)=>(
                                < Box row={row} 
                                xt={xt}
                                setisstart={setisstart}
                                cl={cl} 
                                setcl={setcl} 
                                colr={colr} 
                                setcolr={setcolr} 
                                column={column} 
                                xx={xx} 
                                setxx={setxx} 
                                yy={yy} 
                                setyy={setyy} 
                                setwin={setwin}  
                                setlose={setlose} 
                                t={t}  
                                kx1={xw} 
                                setxw={setxw} 
                                ky1={yw} 
                                setyw={setyw} 
                                kx={x} 
                                setx={setx} 
                                ky={y} 
                                sety={sety} 
                                socket={socket} 
                                pieces={pi}  
                                sett={sett} 
                                val={val} Change={setChange} 
                                />
                            ))}
                            </div>)
                        }
                    })
                }
            </div>
            </div>
            
    </div>
    <div id='timer2'><Timer2 isstart={isstart} socket={socket}/></div>  
    <h1 id='lose'>{" Checkmate"}</h1>
    <h1 id='win'>{" You win "}</h1>
    
    </>
    
  )
}
