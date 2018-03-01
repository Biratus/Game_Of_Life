function Cell(state) {
    this.state=state;
    this.neighbours=[8];
}

Cell.prototype.update=function() {
    if(getLiveNeighbours()<2 && this.state==State.ALIVE) {
        this.state=State.DEAD;
    } else if(this.state==State.ALIVE && getLiveNeighbours()>3) {
        this.state=State.DEAD;
    } else if(this.state==State.DEAD && getLiveNeighbours()==3) {
        this.state=State.ALIVE;
    }
}

Cell.prototype.getLiveNeighbours=function() {
    int n=0;
    for(Cell c : this.neighbours) {
        if(c.state==State.ALIVE) n++;
    }
    return n;
}

