import { ischeck } from "./check.js";
import { qmove } from "./king.js";
import {dpmove,lpmove,kmove,rmove,bmove} from "./logic.js";
function find(se2,ps,kx,ky){
    var k=1;
    for(var i=ps[se2].x+1;i<=8;i++){
        var x=i;
        var y=ps[se2].y;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    for(var i=ps[se2].x-1;i>=0;i--){
        var x=i;
        var y=ps[se2].y;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    for(var i=ps[se2].y+1;i<=8;i++){
        var x=ps[se2].x;
        var y=i;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    for(var i=ps[se2].y-1;i>=0;i--){
        var x=ps[se2].x;
        var y=i;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    return k;
}
function find1(se2,ps,kx,ky){
    var k=1;
    for(var i=ps[se2].x+1,j=ps[se2].y+1;i<=8||j<=8;i++,j++){
        var x=i;
        var y=j;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    for(var i=ps[se2].x+1,j=ps[se2].y-1;i<=8||j>0;i++,j--){
        var x=i;
        var y=j;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    for(var i=ps[se2].x-1,j=ps[se2].y+1;i>0||j<=8;i--,j++){
        var x=i;
        var y=j;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    for(var i=ps[se2].x-1,j=ps[se2].y-1;i>0||j>0;i--,j--){
        var x=i;
        var y=j;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
    }
    return k;
}
function find3(se2,ps,kx,ky){
    var x1=ps[se2].x;
    var y1=ps[se2].y;
        var x=x1+2;
        var y=y1+1; 
        var k=1;
        var idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
         y=y1+2;
         x=x1+1;
        idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
         x=x1-2;
         y=y1-1;
        idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
         x=x1-1;
         y=y1-2;
        idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
         x=x1-2;
         y=y1+1;
        idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
         x=x1+1;
         y=y1-2;
        idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
         x=x1+2;
         y=y1-1;
        idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
         x=x1-1;
         y=y1+2;
        idx1=ps.findIndex((Px) => Px.key===`n${x}${y}`);
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
        if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
        if(idx1!==-1 && ischeck(ps,kx,ky,idx1,se2)===0){
            k=0;
        }
        return k;
  }
export const ischeckmate=(se,idx,ps,kx,ky)=> {
    var k=1;
    var se1 = ps.findIndex((Px) => Px.t===`dp`);
    while(se1!==-1){
      ps[se1].t='xp';
      var x=ps[se1].x;
      var y=ps[se1].y;
      var idx1 = ps.findIndex((Px) => Px.key===`n${x+1}${y+1}`);
      var idx2 = ps.findIndex((Px) => Px.key===`n${x+1}${y-1}`);
      var idx3 = ps.findIndex((Px) => Px.key===`n${x+1}${y}`);
      if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`d${x+1}${y+1}`);}
      if(idx1===-1){idx1=ps.findIndex((Px) => Px.key===`l${x+1}${y+1}`);}
      if(idx2===-1){idx1=ps.findIndex((Px) => Px.key===`d${x+1}${y-1}`);}
      if(idx2===-1){idx1=ps.findIndex((Px) => Px.key===`l${x+1}${y-1}`);}
      if(idx3===-1){idx1=ps.findIndex((Px) => Px.key===`d${x+1}${y}`);}
      if(idx3===-1){idx1=ps.findIndex((Px) => Px.key===`l${x+1}${y}`);}
      if(idx1!==-1 && ps[idx1].c==='n'){idx1=-1}
      if(idx2!==-1 && ps[idx2].c==='n'){idx2=-1}
      if(idx1!==-1){
      if(ischeck(ps,kx,ky,idx1,se1)===0){
            k=0;
      }
      }
      if(idx2!==-1){
        if(ischeck(ps,kx,ky,idx2,se1)===0){
            k=0;
      }
      }
      if(idx3!==-1){
        if(ischeck(ps,kx,ky,idx3,se1)===0){
            k=0;
        }
      }
      se1=ps.findIndex((Px) => Px.t===`dp`);
    }
    var se1 = ps.findIndex((Px) => Px.t===`xp`);
    while(se1!==-1){
        console.log(se1);
      ps[se1].t='dp';
      se1=ps.findIndex((Px) => Px.t===`xp`);
    }
    var se2 = ps.findIndex((Px) => Px.t===`dq`);
    if(se2!=-1 && k===1){
        k=find(se2,ps,kx,ky);
    }
    se2 = ps.findIndex((Px) => Px.t===`dr`);
    if(se2!=-1 && k===1){
        k=find(se2,ps,kx,ky);
    }
    se2=ps.findIndex((Px) => Px.t==='dq' );
    if(se2!=-1 && k===1){
        k=find1(se2,ps,kx,ky);
    }
    se2=ps.findIndex((Px) => Px.t==='db');
    ps[se2].t='dx';
    if(se2!=-1 && k===1){
        k=find1(se2,ps,kx,ky);
    }
    var se3=ps.findIndex((Px) => Px.t==='db');
    ps[se2].t='db';
    if(se3!=-1 && k===1){
        k=find1(se3,ps,kx,ky);
    }
    se2=ps.findIndex((Px) => Px.t==='dk');
    if(se2!=-1 && k===1){
        k=find3(se2,ps,kx,ky);
    }
     se3=ps.findIndex((Px) => Px.t==='dk');
    if(se3!=-1 && k===1){
        k=find3(se3,ps,kx,ky);
    }
    ps[se2].t='dk';
    var idx11=ps.findIndex((Px) => Px.key===`n${kx+1}${ky+1}`);
    var xse=ps.findIndex((Px) => Px.key===`d${kx}${ky}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    var idx11=ps.findIndex((Px) => Px.key===`n${kx-1}${ky-1}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    var idx11=ps.findIndex((Px) => Px.key===`n${kx-1}${ky+1}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    var idx11=ps.findIndex((Px) => Px.key===`n${kx+1}${ky-1}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    var idx11=ps.findIndex((Px) => Px.key===`n${kx+1}${ky}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    var idx11=ps.findIndex((Px) => Px.key===`n${kx-1}${ky}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    var idx11=ps.findIndex((Px) => Px.key===`n${kx}${ky-1}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    var idx11=ps.findIndex((Px) => Px.key===`n${kx}${ky+1}`);
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`d${x}${y}`);}
    if(idx11===-1){idx1=ps.findIndex((Px) => Px.key===`l${x}${y}`);}
    if(idx11!==-1 && qmove(xse,idx11,ps)===1){
        k=0;
    }
    if(k===1){return 1;}
    else{return 0;}
}