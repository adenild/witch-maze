class Player {
    constructor(moves) {
        this.reset();
        this.startMoves = moves;
        this.moves = moves;
        this.valid = false;
    }

    reset() {
        this.col = Math.floor(randomModule.random() * 10);
        this.row = Math.floor(randomModule.random() * 10);
        this.moves = this.startMoves;
        $('#movesLeft').text(this.moves);
    }

    moveHandler(direction) {
        if (this.moves > 0) {
            this[direction]();
            if (this.valid){
                maze.redraw();
                user_data['round']['moves'].push(this.startMoves-this.moves);
                user_data['round']['level'].push(reward.level);
                user_data['round']['score'].push(reward.rewardsScore);
                user_data['round']['direcao'].push(direction);
                if (direction == ('up') || direction == 'down'){
                    user_data['round']['eixo'].push('vertical');
                }else{
                    user_data['round']['eixo'].push('horizontal');
                }
            }
            console.log(user_data)
            $('#movesLeft').text(this.moves);
        } else {
//
//            this.postData('https://safe-basin-68612.herokuapp.com/data',user_data).then(data => {
//                console.log(data);
//            });
            if (confirm('Obrigado por contribuir com este experimento científico!\n' +
            'Deseja jogar de novo para ajudar mais com a coleta de dados?')){onClick()}
        }
    }
//'https://safe-basin-68612.herokuapp.com/data'
    async postData(url = '', data = {}){
        const response = await fetch (url,{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    up() {
            if (!maze.cells[this.col][this.row].northWall && this.row !== 0) {
                this.row -= 1;
                this.moves -= 1;
                this.valid = true;
            } else{
                this.valid = false;
            }
    }

    down() {
            if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
                this.row += 1;
                this.moves -= 1;
                this.valid = true;
            } else{
                this.valid = false;
            }
    }
    left() {
            if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
                this.col -= 1;
                this.moves -= 1;
                this.valid = true;
            } else{
                this.valid = false;
            }
    }
    right() {
            if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
                this.col += 1;
                this.moves -= 1;
                this.valid = true;
            } else{
                this.valid = false;
            }
    }
}

// {
//     pos_inic = verificar se precisa
//     partida_id:'', Será definido pelo banco de dados como autoincrement.
//     algoritmo_usado:'',
//     seed:'',
//     player_moves:[],
//     var_player {
//         var1:...
//         var2:...
//         var3:...
//         var4:...
//         var5:...
//     },
//     var_env {
//         var1:...
//         var2:...
//         var3:...
//         var4:...
//         var5:...
//     }
// mongodb+srv://admin:<password>@cluster0.ywim5.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://admin:cenorinha123@cluster0.ywim5.mongodb.net/tests?retryWrites=true&w=majority
// }