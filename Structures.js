function block(pos) {
    cells[pos.y][pos.x]=ALIVE;
    cells[pos.y+1][pos.x]=ALIVE;
    cells[pos.y][pos.x+1]=ALIVE;
    cells[pos.y+1][pos.x+1]=ALIVE;
}

function blinker(pos) {
    cells[pos.y][pos.x]=ALIVE;
    cells[pos.y][pos.x-1]=ALIVE;
    cells[pos.y][pos.x+1]=ALIVE;
}

function toad(pos) {
    for(var i=pos.x;i<pos.x+3;i++) {
        cells[pos.y+1][i]=ALIVE;
    }
    for(var i=pos.x+1;i<pos.x+4;i++) {
        cells[pos.y][i]=ALIVE;
    }
}

function beacon(pos) {
    block(pos);
    block({"x":pos.x+2,"y":pos.y+2});
}