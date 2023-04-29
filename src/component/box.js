import React, { useEffect, useState } from "react";
import "./box.css";
import sound from "./mixkit-gate-latch-click-1924 .mp3";


import {dpmove,lpmove,kmove,rmove,bmove} from "./logic.js";
import {qmove,lqmove} from "./king.js";
import {ischeckmate} from "./checkmate.js";
import {ischeckmatew} from "./checkmatew.js";
export default function Box(props) {
  const [colr1,setcolr1]=useState('')
  const socket=props.socket;
  const soc=props.socket;
  const Pi = props.pieces;
  const ps=[];
  let image = null;
  let x1 = null;
  let x = 0;
    let y = 0;
    let idx = -1;
  let c = "no";
  for (var i = 0; i < Pi.length; i++) {
    ps.push(Pi[i]);
    if (Pi[i].x == props.row && Pi[i].y == props.column) {
      image = Pi[i].image;
      x = Pi[i].x;
      y = Pi[i].y;
      idx = i;
      c = Pi[i].c;
    }
  }
  useEffect(()=>{
    socket.on("receive",(data)=>{
      props.sett(data);
      if(data===0){
          props.setisstart('true');
      }
      if(data===1){
        props.setisstart('true');
      }
       
    });
  },[socket])
  useEffect(()=>{
    socket.on("rec",(data)=>{
      const yy=document.getElementById(`d${data.a}${data.b}`);
      props.setcolr(`d${data.a}${data.b}`)
      setcolr1(`d${data.c}${data.d}`)
      yy.className='ll';
      const zz=document.getElementById(`d${data.c}${data.d}`);
      zz.className='ll';
    });
  },[socket])
  useEffect(()=>{
    socket.on("re",(data)=>{
      const yy=document.getElementById(data.a);
      if(yy!=null){
      yy.className='l';
      }
      const zz=document.getElementById(data.b);
      if(zz!=null){
      zz.className='l';
      }
    });
  },[socket])
  useEffect(()=>{
    soc.on("rcheck",(data)=>{
      const zz=document.getElementById(data);
      if(zz!=null){
      zz.className='red';
      }
    });
  },[soc])
  useEffect(()=>{
    soc.on("lose",(data)=>{
      props.setlose(1);
    });
  },[soc])
  const sendMessage=(ps,t)=>{
    socket.emit("send_message", ps);
      socket.on("receive_message",(data)=>{
        props.Change(data);
      });
  };
  const allowDrop = (e) => {
   e.preventDefault()
  };
  const start = (e) => {
   
    const se1 = Pi.findIndex((Px) => Px.c==='y');
    const se2 = Pi.findIndex((Px) => Px.c==='x');
    console.log(se1,se2,"chut")
    if((se1===-1 && se2===-1) || (props.t===1 && props.val===1 && Pi[idx].c!='l') || (props.t===0 && props.val===0 && Pi[idx].c!='d')){
      new Audio(sound).play();
      if(se1!=-1){
        ps[se1].c='d';
        props.Change(ps);
        console.log(Pi[se1].c,Pi[se1].key)
      }
      if(se2!=-1){ps[se2].c='l';props.Change(ps);}
      const xxx=document.getElementById(`d${props.xx}${props.yy}`)
     console.log(props.cl,"love");
      if(props.cl===1){
        if(xxx!=null){
          xxx.className='l';   
        }
      }
      props.setcl(1);
     const yy=document.getElementById(`d${x}${y}`);
     yy.className='ll';
     props.setxx(x);
     props.setyy(y);
      if(Pi[idx].image!=null){
        if(ps[idx].c==='l'){
          ps[idx].c='x';
        }
        else{
          ps[idx].c='y';
        }
        props.Change(ps);
      }
    }
  }
 
  const onend = (e) => {
    console.log(idx);
  };
  function myFunction(se, idx1,c1) {
    const x234=ps[se].image;
    const t=ps[se].t;
    ps[se].image=null;
    ps[se].c='n';
    ps[se].key=`n${ps[se].x}${ps[se].y}`
    ps[se].t='n';
    ps[idx1].image=x234;
    ps[idx1].c=c1;
    ps[idx1].key=`${c1}${ps[idx1].x}${ps[idx1].y}`
    ps[idx1].t=t;
  }
  const end=(e)=>{
    const se1 = Pi.findIndex((Px) => Px.c==='y');
    const se2 = Pi.findIndex((Px) => Px.c==='x');
    if(Pi[idx].image===null ||(Pi[idx].c==='l' && se1!=-1)|| (Pi[idx].c==='d' && se2!=-1)){
      if(se1!=-1 && ps[idx].c!='d' && props.val===1 && props.t===1 && props.xt===0){
        ps[se1].c='d';
          props.Change(ps);
          if(qmove(se1,idx,ps)===1){
            myFunction(se1,idx,'d');
            props.setx(ps[idx].x);
            props.sety(ps[idx].y);
            props.Change(ps);
            props.sett(0);
            socket.emit('send',0);
            sendMessage(ps,props.t);
            const yy=document.getElementById(`d${x}${y}`);
            yy.className='ll';
            socket.emit('color',{a:x,b:y,c:props.xx,d:props.yy})
            props.setxx(x);
            props.setyy(y);
            props.setcl(0);
            const yy1=document.getElementById(props.colr);
            yy1.className='l';
            const zz1=document.getElementById(colr1);
            zz1.className='l';
            socket.emit('color1',{a:props.colr,b:colr1})
            new Audio(sound).play();
          }
          else if((dpmove(se1,idx,ps,props.kx,props.ky)===1 || kmove(se1,idx,ps,props.kx,props.ky)===1 || rmove(se1,idx,ps,props.kx,props.ky)===1 ||bmove(se1,idx,ps,props.kx,props.ky))){
            myFunction(se1,idx,'d');
            props.Change(ps); 
            props.sett(0);
            props.setcl(0);
            socket.emit('send',0);
            sendMessage(ps,props.t);
            
            const yy1=document.getElementById(props.colr);
            if(yy1!=null){
            yy1.className='l';
            const zz1=document.getElementById(colr1);
            zz1.className='l';
            }
            props.setisstart('false')
            socket.emit('color1',{a:props.colr,b:colr1})
            new Audio(sound).play();
            const yy=document.getElementById(`d${x}${y}`);
            yy.className='ll';
            socket.emit('color',{a:x,b:y,c:props.xx,d:props.yy})
            props.setxx(x);
            props.setyy(y);
          }
          else{const xxx=document.getElementById(`d${props.xx}${props.yy}`)
          xxx.className='l';}
          var idx1 = ps.findIndex((Px) => Px.t===`lki`);
            var kx=ps[idx1].x;
            var ky=ps[idx1].y;
            props.setisstart('false')
            if(ischeckmatew(se1,idx,ps,kx,ky)===1){
              var xt=document.getElementById(`d${kx}${ky}`)
              xt.className='red';
              socket.emit('check',`d${kx}${ky}`)
              props.setwin(1);soc.emit('checkmate','checkmate');
            }
      }
      console.log(se2,props.val,props.t,ps[idx].c,"nikhil")
    if(se2!=-1 && props.val===0 && props.t===0 && props.xt===0 && ps[idx].c!='l'){
      ps[se2].c='l'
      props.Change(ps);
        if(ps[idx].c!='l'){
          if(lqmove(se2,idx,ps)===1){
            myFunction(se2,idx,'l');
            props.setxw(ps[idx].x);
            props.setyw(ps[idx].y);
            props.Change(ps);
            props.sett(1);
            props.setisstart('false')
            props.setcl(0);
            socket.emit('send',1);
            sendMessage(ps,props.t);
            const yy=document.getElementById(`d${x}${y}`);
           props.setcolr('xyx');
           console.log(props.colr);
            yy.className='ll';
            socket.emit('color',{a:x,b:y,c:props.xx,d:props.yy})
            props.setxx(x);
            props.setyy(y);
            const yy1=document.getElementById(props.colr);
            yy1.className='l';
            const zz1=document.getElementById(colr1);
            zz1.className='l';
            socket.emit('color1',{a:props.colr,b:colr1})
            new Audio(sound).play();
          }
         else if((lpmove(se2,idx,ps,props.kx1,props.ky1) || kmove(se2,idx,ps,props.kx1,props.ky1)===1 || rmove(se2,idx,ps,props.kx1,props.ky1)===1 ||bmove(se2,idx,ps,props.kx1,props.ky1))){
            myFunction(se2,idx,'l');
            props.Change(ps);
            props.sett(1);
            props.setisstart('false')
            socket.emit('send',1);
            sendMessage(ps,props.t); 
            const yy1=document.getElementById(props.colr);
            if(yy1!=null){
            yy1.className='l';
            const zz1=document.getElementById(colr1);
            zz1.className='l';
            } 
            new Audio(sound).play();
            props.setcl(0);
            const yy=document.getElementById(`d${x}${y}`);
            yy.className='ll';
              props.setxx(x);
              socket.emit('color',{a:x,b:y,c:props.xx,d:props.yy})
              props.setyy(y);
              socket.emit('color1',{a:props.colr,b:colr1})
          }
          else{const xxx=document.getElementById(`d${props.xx}${props.yy}`)
          xxx.className='l';}
        } 
        var idx1 = ps.findIndex((Px) => Px.t===`dki`);
        var kx=ps[idx1].x;
        var ky=ps[idx1].y;
        if(ischeckmate(se2,idx,ps,kx,ky)===1){
          var xt=document.getElementById(`d${kx}${ky}`)
              xt.className='red';
              socket.emit('check',`d${kx}${ky}`)
          props.setwin(1);soc.emit('checkmate','checkmate');}
      }  
    }
  }
  return (
    <>
      {(props.row % 2 === 0 && props.column % 2 === 1) ||
      (props.row % 2 === 1 && props.column % 2 === 0) ? (
        <div
        className='color1'
        draggable="true" 
          id={`${props.row}${props.column}`}
          onDrop={(e)=> end(e)}  onDragOver={(e)=>allowDrop(e)}  onDragEnd={(e)=> onend(e)}
          onTouchStart={(e)=> end(e)}
          onClick={(e)=> end(e)}   
        >
          <>
          <div id={`d${x}${y}`} className="l">
        
            {c != "n" ? (
              
              <img
              id={`${Pi[idx].c}${x}${y}`}
                onDragStart={(e)=> start(e)}
                onTouchStart={(e)=> start(e)}
                onClick={(e)=> start(e)}
                className="chesbd"
                src={Pi[idx].image}
              />  
            ) : (
              <div></div>
            )}
            </div>
          </>
          
        </div>
        
      ) : (
        <div
          className='color2'
          id={`${props.row}${props.column}`}
          onDrop={(e)=> end(e)}  onDragOver={(e)=>allowDrop(e)}
          onTouchEnd={(e)=> end(e)}
          onClick={(e)=> end(e)} 
        >
          <>
          <div id={`d${x}${y}`} className="l">
        
            {c!= "n" ? (
              <img
              onDragStart={(e)=> start(e)}  
              onTouchStart={(e)=> start(e)}
              onClick={(e)=> start(e)}
              id={`${Pi[idx].c}${x}${y}`}
                draggable="true"
                className="chesbd"
                src={Pi[idx].image}
              />
            ) : (
              <div></div>
            )}
            </div>
          </>
        </div>
       
      )}
    </>
    
  );
}
