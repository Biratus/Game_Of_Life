var cells=[[]];
var ctx;
var canvas;
var CELL_W,CELL_H;
var CELL_NB=250;
var ALIVE=1,DEAD=0;
var time;
var initState=[];
window.onload=function() {
canvas = document.getElementById("canvas");;
ctx=canvas.getContext("2d");
CELL_W=canvas.width/CELL_NB;
CELL_H=canvas.height/CELL_NB;
init();
//time=setTimeout(update,1000);
}

function init() {
for(var i=0;i<CELL_NB;i++) {
    cells[i]=[];
    for(var j=0;j<CELL_NB;j++) {
        cells[i][j]=DEAD;
    }
}
 /*for(var row = CELL_NB/2-Math.round(CELL_NB/4);row<CELL_NB/2+Math.round(CELL_NB/4);row++) {
    for(var col=CELL_NB/2-Math.round(CELL_NB/4);col<CELL_NB/2+Math.round(CELL_NB/4);col++) {
        cells[row][col]=Math.random()>0.5?ALIVE:DEAD;
        initState.push({"row":row,"col":col,"val":cells[row][col]});
    }
}*/
draw();
}

function update() {
    var toChange=[];
for(var row=0;row<CELL_NB;row++) {
    for(var col=0;col<CELL_NB;col++) {
        var nbAlive = getNeighboursAlive(row,col);
        var state = cells[row][col];
        if(state==ALIVE && nbAlive<2) {
            toChange.push({"row":row,"col":col,"val":DEAD});
            //console.log(row+" "+col+" alive to dead nbAlive<2");
        }
        else if(state==ALIVE && nbAlive>3) {
            toChange.push({"row":row,"col":col,"val":DEAD});
            //console.log(row+" "+col+" alive to dead nbAlive>3");
        }
        else if(state==DEAD && nbAlive==3) {
            toChange.push({"row":row,"col":col,"val":ALIVE});
            //console.log(row+" "+col+" dead to alive");
        }
    }
}
for(var i=0;i<toChange.length;i++) {
    cells[toChange[i].row][toChange[i].col]=toChange[i].val;
}
draw();
time=setTimeout(update,10);
}


function draw() {
for(var row=0;row<CELL_NB;row++) {
    for(var col=0;col<CELL_NB;col++) {
        var stateCol = cells[row][col]==ALIVE?"#000000":"#FFFFFF";
        ctx.fillStyle=stateCol;
        ctx.fillRect(col*CELL_W,row*CELL_H,CELL_W,CELL_H);
    }
}
}

function getNeighboursAlive(row,col) {
    var n=0;
    switch(row) {
        case 0:
            switch(col) {
                case 0: 
                    n+=cells[row][col+1];
                    n+=cells[row+1][col];
                    n+=cells[row+1][col+1];
                    break;
                case CELL_NB-1: 
                    n+=cells[row][col-1];
                    n+=cells[row+1][col-1];
                    n+=cells[row+1][col];
                    break;
                default: 
                    n+=cells[row][col-1];
                    n+=cells[row][col+1];
                    n+=cells[row+1][col-1];
                    n+=cells[row+1][col];
                    n+=cells[row+1][col+1];
                    break;
            }
        break;
        case CELL_NB-1:
            switch(col) {
                case 0: 
                    n+=cells[row-1][col];
                    n+=cells[row-1][col+1];
                    n+=cells[row][col+1];
                    break;
                case CELL_NB-1:
                    n+=cells[row-1][col-1];
                    n+=cells[row-1][col]; 
                    n+=cells[row][col-1];
                    break;
                default:
                    n+=cells[row-1][col-1];
                    n+=cells[row-1][col];
                    n+=cells[row-1][col+1];
                    n+=cells[row][col-1];
                    n+=cells[row][col+1];
                    break;
            }
        break;
        default:
            switch(col) {
                case 0: 
                    n+=cells[row-1][col];
                    n+=cells[row-1][col+1];
                    n+=cells[row][col+1];
                    n+=cells[row+1][col];
                    n+=cells[row+1][col+1];
                    break;
                case CELL_NB-1: 
                    n+=cells[row-1][col-1];
                    n+=cells[row-1][col];
                    n+=cells[row][col-1];
                    n+=cells[row+1][col-1];
                    n+=cells[row+1][col];
                    break;
                default:
                    n+=cells[row-1][col-1];
                    n+=cells[row-1][col];
                    n+=cells[row-1][col+1];
                    n+=cells[row][col-1];
                    n+=cells[row][col+1];
                    n+=cells[row+1][col-1];
                    n+=cells[row+1][col];
                    n+=cells[row+1][col+1];
                    break;
        }
        break;
}

return n;
}

function stop() {
clearTimeout(time);
}

function save() {
    var str="";
    for(var i=0;i<initState.length;i++) {
        str+='{"row":'+initState.row+',"col":'+initState.col+',"val":'+initState.val+'},';
    }
    console.log(str);
}