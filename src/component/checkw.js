function checkkn(x1,x2,y1,y2){
    if(
        (x1+2===x2 && y1+1===y2) 
        ||
        (y1+2===y2 && x1+1===x2)
        ||
        (x1-2===x2 && y1-1===y2)
        ||
        (y1-2===y2 && x1-1===x2)
        ||
        (x1-2===x2 && y1+1===y2)
        ||
        (y1-2===y2 && x1+1===x2)
        ||
        (x1+2===x2 && y1-1===y2)
        ||
        (y1+2===y2 && x1-1===x2)
    ){return 1;}
    else return 0;
  }
  export const ischeckw=(ps,kx,ky,idx,se)=> {
      let x=0;
    for(var i=kx+1;i<=8;i++){
      const se2 = ps.findIndex((Px) => Px.key===`d${i}${ky}`);
      const se1 = ps.findIndex((Px) => Px.key===`l${i}${ky}`);
      if(i===ps[idx].x && ky===ps[idx].y){break;}
      if(se2!=-1){
          if(ps[se2].t==='dq' || ps[se2].t==='dr'){
              x=1;
          }
          break;
      }
      if(se1!=-1){
        if(i===ps[se].x && ky===ps[se].y){}
        else{
          break;
        }
      }
    }
    for(var i=ky-1;i>=0;i--){
      const se1 = ps.findIndex((Px) => Px.key===`l${kx}${i}`);
      const se2 = ps.findIndex((Px) => Px.key===`d${kx}${i}`);
      if(kx===ps[idx].x && i===ps[idx].y){break;}
          if(se2!=-1){
            if(ps[se2].t==='dq' || ps[se2].t==='dr'){
              x=1;
          }
          break;
          }
          if(se1!=-1){
            if(kx===ps[se].x && i===ps[se].y){}
            else{
              break;
            }
          }
  }
  for(var i=ky+1;i<=8;i++){
    const se1 = ps.findIndex((Px) => Px.key===`l${kx}${i}`);
    const se2 = ps.findIndex((Px) => Px.key===`d${kx}${i}`);
    if(kx===ps[idx].x && i===ps[idx].y){break;}
    if(se2!=-1){
      if(ps[se2].t==='dq' || ps[se2].t==='dr'){
        x=1;
    }
    break;
    }
    if(se1!=-1){
      if(kx===ps[se].x && i===ps[se].y){}
      else{
        break;
      }
    }
  }
  for(var i=kx-1;i>=0;i--){
    const se1 = ps.findIndex((Px) => Px.key===`l${i}${ky}`);
    const se2 = ps.findIndex((Px) => Px.key===`d${i}${ky}`);
    if(i===ps[idx].x && ky===ps[idx].y){break;}
    if(se2!=-1){
      if(ps[se2].t==='dq' || ps[se2].t==='dr'){
        x=1;
    }
    break;
    }
    if(se1!=-1){
      if(i===ps[se].x && ky===ps[se].y){}
      else{
        break;
      }
    }
  }
    for(var i=kx+1,j=ky+1;i<=8||j<=8;i++,j++){
      const se1 = ps.findIndex((Px) => Px.key===`l${i}${j}`);
      const se2 = ps.findIndex((Px) => Px.key===`d${i}${j}`);
      if(i===ps[idx].x && j===ps[idx].y){break;}
          if(se2!=-1){
            if(ps[se2].t==='dq' || ps[se2].t==='db'){
             x=1;
              break;
            }
          }
          if(se1!=-1){
            if(i==ps[se].x && j==ps[se].y){}
            else{
              break;
            }
          }
  }
  for(var i=kx+1,j=ky-1;i<=8||j>0;i++,j--){
    const se1 = ps.findIndex((Px) => Px.key===`l${i}${j}`);
    const se2 = ps.findIndex((Px) => Px.key===`d${i}${j}`);
    if(i===ps[idx].x && j===ps[idx].y){break;}
        if(se2!=-1){
          if(ps[se2].t==='dq' || ps[se2].t==='db'){
            x=1;
             break;
           }
        }
        if(se1!=-1){
          if(i==ps[se].x && j==ps[se].y){}
          else{
            break;
          }
        }
  }
  for(var i=kx-1,j=ky+1;i>0||j<=8;i--,j++){
    const se1 = ps.findIndex((Px) => Px.key===`l${i}${j}`);
    const se2 = ps.findIndex((Px) => Px.key===`d${i}${j}`);
    if(i===ps[idx].x && j===ps[idx].y){break;}
    if(se2!=-1){
      if(ps[se2].t==='dq' || ps[se2].t==='db'){
        x=1;
         break;
       }
    }
    if(se1!=-1){
      if(i==ps[se].x && j==ps[se].y){}
      else{
        break;
      }
    }
  }
  for(var i=kx-1,j=ky-1;i>0||j>0;i--,j--){
    const se1 = ps.findIndex((Px) => Px.key===`l${i}${j}`);
    const se2 = ps.findIndex((Px) => Px.key===`d${i}${j}`);
    if(i===ps[idx].x && j===ps[idx].y){break;}
    if(se2!=-1){
      if(ps[se2].t==='dq' || ps[se2].t==='db'){
        x=1;
         break;
       }
    }
    if(se1!=-1){
      if(i==ps[se].x && j==ps[se].y){}
      else{
        break;
      }
    }
  }
  const se1 = ps.findIndex((Px) => Px.key===`d${kx+1}${ky+1}`);
  if(se1!=-1){
    if(ps[se].t==='dp'){
      if(kx-1===ps[idx].x && ky+1===ps[idx].y){}
      else{
        x=1;
      }
    }
  }
  const se2 = ps.findIndex((Px) => Px.key===`d${kx+1}${ky-1}`);
  if(se2!=-1){
    if(ps[se].t==='dp'){
    if(kx-1===ps[idx].x && ky-1===ps[idx].y){}
    else{
      x=1;
    }
  }
  }
  var x1=kx;
  var y1=ky;
  var x22=ps[idx].x ;
  var y22=ps[idx].y
  const se11 = ps.findIndex((Px) => Px.t===`dk`);
  var x2=ps[se11].x;
  var y2=ps[se11].y;
  ps[se11].t='tttttt';
  const se22 = ps.findIndex((Px) => Px.t===`dk`);
  var x3=ps[se22].x;
  var y3=ps[se22].y;
  ps[se11].t='dk';
    if(checkkn(x1,x2,y1,y2)){
      if(checkkn(x1,x22,y1,y22)){}
      else{
      x=1;
      }
    }
    if(checkkn(x1,x3,y1,y3)){
      if(checkkn(x1,x22,y1,y22)){}
      else{
      x=1;
      }
    }
    
    if(x===1){return 1;}
    else{return 0;}
  }