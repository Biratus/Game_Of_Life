function beacon(pos) {
    make("block",pos);
    make("block",{"x":pos.x+2,"y":pos.y+2});
}

var struct={};

function loadStruct() {
    $.ajax({
        url:"/Structures.json",
        dataType:"json",
        success:function(data) {
            struct=data;
            console.log("success");
        },
        error: function() {
            console.log("error");
        }
    });
}

function pentadecathlon(pos) {
    for(var i=pos.x;i<pos.x+10;i++) {
        cells[pos.y][i]=ALIVE;
    }
}

function make(structName,pos) {
    if(structName=="beacon") {
        beacon(pos);
    } else if(structName=="pentadecathlon") {
        pentadecathlon(pos);
    } 
    else if(!struct[structName]) {
        console.log("No structure with matching name: "+structName);
        return;
    }
    else {
        for(var i = 0; i<struct[structName].length;i++) {
            cells[pos.y+struct[structName][i][1]][pos.x+struct[structName][i][0]]=ALIVE;
        }
    }
    draw();
}