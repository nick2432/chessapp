import React, { useEffect, useState } from "react";
import "./box.css";
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
      yy.className='l';
      const zz=document.getElementById(data.b);
      zz.className='l';
    });
  },[socket])
  useEffect(()=>{
    soc.on("lose",(data)=>{
      console.log(data)
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
    if((se1===-1 && se2===-1) || (se1!=-1 && Pi[idx].c==='d') ||(se2!=-1 && Pi[idx].c==='l')){
      if(se1!=-1){
        ps[se1].c='d';
        props.Change(ps);
        console.log(Pi[se1].c,Pi[se1].key)
      }
      if(se2!=-1){ps[se2].c='l';props.Change(ps);}
      const xxx=document.getElementById(`d${props.xx}${props.yy}`)
      if(xxx!=null){
      xxx.className='l';
      }
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
  const onstart = (e) => {
    const se1 = Pi.findIndex((Px) => Px.key==='y');
    const se2 = Pi.findIndex((Px) => Px.key==='x');
    e.target.id=`${Pi[idx].c}`
    const se = Pi.findIndex((Px) => Px.key===`${Pi[idx].c}${x}${y}`);
    if(ps[se].c==='l'){
      ps[se].key='x';
    }
    else{
      ps[se].key='y';
    }
    props.Change(ps);
    sendMessage(ps);
  };
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
      if(se1!=-1 && ps[idx].c!='d' && props.val===1 && props.t===1){
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
            const yy1=document.getElementById(props.colr);
            yy1.className='l';
            const zz1=document.getElementById(colr1);
            zz1.className='l';
            socket.emit('color1',{a:props.colr,b:colr1})
          }
          else if((dpmove(se1,idx,ps,props.kx,props.ky)===1 || kmove(se1,idx,ps,props.kx,props.ky)===1 || rmove(se1,idx,ps,props.kx,props.ky)===1 ||bmove(se1,idx,ps,props.kx,props.ky))){
            myFunction(se1,idx,'d');
            props.Change(ps); 
            props.sett(0);
            socket.emit('send',0);
            sendMessage(ps,props.t);
            const yy=document.getElementById(`d${x}${y}`);
            yy.className='ll';
            socket.emit('color',{a:x,b:y,c:props.xx,d:props.yy})
            props.setxx(x);
            props.setyy(y);
            const yy1=document.getElementById(props.colr);
            yy1.className='l';
            const zz1=document.getElementById(colr1);
            zz1.className='l';
            socket.emit('color1',{a:props.colr,b:colr1})
          }
          else{const xxx=document.getElementById(`d${props.xx}${props.yy}`)
          xxx.className='l';}
          var idx1 = ps.findIndex((Px) => Px.t===`lki`);
            var kx=ps[idx1].x;
            var ky=ps[idx1].y;
            if(ischeckmatew(se1,idx,ps,kx,ky)===1){props.setwin(1);soc.emit('checkmate','checkmate');}
      }
      console.log(se2,props.val,props.t,ps[idx].c,"nikhil")
    if(se2!=-1 && props.val===0 && props.t===0 && ps[idx].c!='l'){
      ps[se2].c='l'
      props.Change(ps);
        if(ps[idx].c!='l'){
          if(lqmove(se2,idx,ps)===1){
            myFunction(se2,idx,'l');
            props.setxw(ps[idx].x);
            props.setyw(ps[idx].y);
            props.Change(ps);
            props.sett(1);
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
          }
         else if((lpmove(se2,idx,ps,props.kx1,props.ky1) || kmove(se2,idx,ps,props.kx1,props.ky1)===1 || rmove(se2,idx,ps,props.kx1,props.ky1)===1 ||bmove(se2,idx,ps,props.kx1,props.ky1))){
            myFunction(se2,idx,'l');
            props.Change(ps);
            props.sett(1);
            socket.emit('send',1);
            sendMessage(ps,props.t);  
            const yy=document.getElementById(`d${x}${y}`);
            yy.className='ll';
              props.setxx(x);
              socket.emit('color',{a:x,b:y,c:props.xx,d:props.yy})
              props.setyy(y);
              const yy1=document.getElementById(props.colr);
              yy1.className='l';
              const zz1=document.getElementById(colr1);
              zz1.className='l';
              socket.emit('color1',{a:props.colr,b:colr1})
          }
          else{const xxx=document.getElementById(`d${props.xx}${props.yy}`)
          xxx.className='l';}
        } 
        var idx1 = ps.findIndex((Px) => Px.t===`dki`);
        var kx=ps[idx1].x;
        var ky=ps[idx1].y;
        if(ischeckmate(se2,idx,ps,kx,ky)===1){props.setwin(1);soc.emit('checkmate','checkmate');}
      }  
    }
  }
  const onDragDrop = (e) => {
    e.preventDefault();
    const ch1=document.getElementById(`${props.xx}${props.yy}`);
    if(ch1!=null && (props.xx+props.yy)%2===1 ){
      ch1.style.backgroundColor = 'white';
    }
    if(ch1!=null && (props.xx+props.yy)%2===0 ){
      ch1.style.backgroundColor = 'green';
    }
    const ch =document.getElementById(`${x}${y}`);
    ch.style.backgroundColor = 'purple';
    props.setxx(x);
    props.setyy(y);
   
    const se1 = Pi.findIndex((Px) => Px.key==='y');
    const se2 = Pi.findIndex((Px) => Px.key==='x');
    if(se1!=-1 ){
        ps[se1].key=`d${ps[se1].x}${ps[se1].y}`;
        props.Change(ps);
        if(ps[idx].c!='d' && props.val===1 && props.t===1){
          console.log(props.v1,"nikhl");
            if(qmove(se1,idx,ps)===1){
              myFunction(se1,idx,'d');
              props.setx(ps[idx].x);
              props.sety(ps[idx].y);
              props.Change(ps);
              props.sett(0);
              socket.emit('send',0);
              sendMessage(ps,props.t);
            }
           if((dpmove(se1,idx,ps,props.kx,props.ky)===1 || kmove(se1,idx,ps,props.kx,props.ky)===1 || rmove(se1,idx,ps,props.kx,props.ky)===1 ||bmove(se1,idx,ps,props.kx,props.ky))){
              myFunction(se1,idx,'d');
              props.Change(ps); 
              props.sett(0);
              socket.emit('send',0);
              sendMessage(ps,props.t);
            }
            var idx1 = ps.findIndex((Px) => Px.t===`lki`);
            var kx=ps[idx1].x;
            var ky=ps[idx1].y;
            if(ischeckmatew(se1,idx,ps,kx,ky)===1){props.setwin(1);soc.emit('checkmate','checkmate');}
        }
    }
  if(se2!=-1){
    ps[se2].key=`l${ps[se2].x}${ps[se2].y}`
    props.Change(ps);
      if(props.val===0 && props.t===0 && ps[idx].c!='l'){
        if(lqmove(se2,idx,ps)===1){
          myFunction(se2,idx,'l');
          props.setxw(ps[idx].x);
          props.setyw(ps[idx].y);
          props.Change(ps);
          props.sett(1);
          socket.emit('send',1);
          sendMessage(ps,props.t);
        }
        if((lpmove(se2,idx,ps,props.kx1,props.ky1) || kmove(se2,idx,ps,props.kx1,props.ky1)===1 || rmove(se2,idx,ps,props.kx1,props.ky1)===1 ||bmove(se2,idx,ps,props.kx1,props.ky1))){
          myFunction(se2,idx,'l');
          props.Change(ps);
          props.sett(1);
          socket.emit('send',1);
          sendMessage(ps,props.t);  
        }
        var idx1 = ps.findIndex((Px) => Px.t===`dki`);
        var kx=ps[idx1].x;
        var ky=ps[idx1].y;
        if(ischeckmate(se2,idx,ps,kx,ky)===1){props.setwin(1);soc.emit('checkmate','checkmate');}
      }
    }
    setTimeout(() => {
      const ch =document.getElementById(`${x}${y}`);
    if((y+x)%2===1 ){
      ch.style.backgroundColor = 'white';
    }
    else{
      ch.style.backgroundColor = 'green';
    }
    }, "1000");
};
  return (
   
    <>
      {(props.row % 2 === 0 && props.column % 2 === 1) ||
      (props.row % 2 === 1 && props.column % 2 === 0) ? (
        
        <div
        className='color1'
        draggable="true" 
          id={`${props.row}${props.column}`}
          onDrop={(e)=> onDragDrop(e)}  onDragOver={(e)=>allowDrop(e)}  onDragEnd={(e)=> onend(e)}
          onTouchStart={(e)=> end(e)}
          onClick={(e)=> end(e)}   
        >
          <>
          <div id={`d${x}${y}`} className="l">
            {c != "n" ? (
              <img
              id={`${Pi[idx].c}${x}${y}`}
                onDragStart={(e)=> onstart(e)}
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
          onDrop={(e)=> onDragDrop(e)}  onDragOver={(e)=>allowDrop(e)}
          onTouchEnd={(e)=> end(e)}
          onClick={(e)=> end(e)} 
        >
          <>
          <div id={`d${x}${y}`} className="l">
            {c!= "n" ? (
              <img
              onDragStart={(e)=> onstart(e)}  
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
