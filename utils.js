function compara_rewards (array1, array2) {
    if (array1.length != array2.length){
        return false
    }
    else{
        for (let index=0; index<array1.length;index++){
            if (array1[index] != array2[index]){
                return false
            }
        }
        return true
    }
}

async function obtem_csv(){
    return $.ajax({
        type: "GET",
        url: "grid/cenario_teste.csv",
        success: function (data) {
            csv_novo(data).then(r => console.log("Consegui!"))
        }
    })
}

async function csv_novo(allText){
    return $.csv.toObjects(allText)
}

function maze_generator(maze_data,maze){
    let col;
    let row;
    for (let obj_index = 0; obj_index < maze_data.length; obj_index++) {
        col = maze_data[obj_index]['Col']
        row = maze_data[obj_index]['Row']
    }
    //maze.cells[col][row] = new MazeCell(col, row);
    console.log(maze)
}

