import Board from './component/board.js';
import Homepage from './component/homepage.js';
import "./App.css";
import { useEffect, useState } from 'react';
import io from "socket.io-client"
const socket = io.connect("https://chess-multiplayer-game1.onrender.com");

function App() {
  const [btn,setbtn] = useState(0);
  const [val,setval] = useState(0);
  const [joined,setjoined] = useState(0);
  const [black,setblack] = useState(-1);
 
  const [a,seta] = useState(0);
  if(btn===1){
    const x=document.getElementById("t");
    x.style.display="flex";
    const x1=document.getElementById("o");
    if(x1!=null){
      x1.remove();
    }
  }
  useEffect(()=>{
    console.log(black)
    if(black===1 || black===0){
    const x=document.getElementById("t");
    x.style.display="flex";
    const x1=document.getElementById("o");
    if(x1!=null){
      x1.remove();
    }
  }
  },[black])
  return(
    <div id={`App${a}`}>
        <div id='o'><Homepage Change={setbtn} joined={joined} setjoined={setjoined} socket={socket}  val={val} btn={btn} setval={setval}/></div>
        <div id='t'><Board  seta={seta} val={val} black={black} setblack={setblack} setval={setval}socket={socket}/></div>
    </div>
  );
}

export default App;
