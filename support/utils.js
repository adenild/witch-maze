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

class UserData{
    constructor(seed, method, userCookie) {
        this.userDict = {}
    }

    setDataStructure() {
        //Variaveis internas de Round
        this.userDict['moves'] = []; //Apagar depois que mudar no banco

        //Outras variáveis
        this.userDict['round'] = {};
        this.userDict['round']['moves'] = [];
        this.userDict['round']['level'] = [];
        this.userDict['round']['score'] = [];
        this.userDict['round']['direction'] = [];
        this.userDict['round']['axis'] = [];

        //Variáveis físicas
        this.userDict['round']['rewardColor'] = [];
        this.userDict['round']['rewardSize'] = [];
        this.userDict['round']['rewardLocation'] = [];
        this.userDict['round']['rewardType'] = [];

        //Variáveis psicológicas
        this.userDict['round']['timeBetweenClicks'] = [];
        this.userDict['round']['swipeDistance'] = [];
        this.userDict['round']['timeStep'] = [];
        this.userDict['round']['swipeTime'] = [];

        //Variaveis fixas
        this.userDict['version'] = 'v1'; //Finalizado - ALTERAR TODA VEZ QUE FIZEREM UMA NOVA VERSÃO
        this.userDict['seed'] = seed; //Finalizado
        this.userDict['used_alg'] = method; //Trocar para variável
        this.userDict['user_id'] = userCookie; // Finalizado
        this.userDict['game_type'] = 'player'; // Finalizado
    }
}