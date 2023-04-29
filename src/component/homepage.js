import "./home.css"
import React, { useEffect, useState } from "react";
export default function Homepage(props) {
  const socket=props.socket;
  const [code1,setcode1]=useState("")
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  useEffect(()=>{
    socket.on("not",(data)=>{
      alert(data)
    });
    socket.on("yes",(data)=>{
      props.Change(1);
    });
  },[socket])
  const goto=()=>{
    if(props.joined===0){
      socket.emit("code1",code1)
    }
    else{
      props.Change(1);
    }
  }
  const createcode=()=>{
    var code=makeid(6);
    const x=document.getElementById("appButton");
    x.remove();
    const x1=document.getElementById("text");
    x1.remove();
    const x2 =document.getElementById("inputBox");
    x2.remove();
    const x4=document.getElementById("z");
    x4.style.display="flex";
    const x5=document.getElementById("clr");
    x5.style.display="flex";
    const x6=document.getElementById("apptn");
    x6.remove();
    setcode1(code);
    props.setjoined(1);
    socket.emit("code",code)
  };
  return (
    <div className='home'>
      <div id="z">waiting for opponent.......</div>
      <div id="clr">Room code is---{<span className="code">{`${code1}`}</span>}</div>
      <button id='appButton' onClick={createcode} type='button'>Create game</button>
      <div id='text'>{"Or join game"}</div>
      <input id='inputBox'type='text' placeholder='Enter code to join game' value={code1}onChange={(e)=>setcode1(e.target.value)}/>
      <button id='apptn' onClick={goto} type='button'>join game</button>
    </div>
  )
}
