class Player {
    constructor(moves) {
        this.reset();
        this.startMoves = moves;
        this.moves = moves;
        this.create_user_structure();
        
    }
    create_user_structure(){
        this.user_data = new Object();
        this.user_data['moves'] = new Array();
        //this.user_data['round'] = new Object();
        this.user_data['flevel'] = '1';
        this.user_data['score'] = '100';
        this.user_data['seed'] = '123123123'; //Normalizar
        this.user_data['used_alg'] = 'batatao';
        this.user_data['version'] = 'v1.0'
        this.user_data['user_id'] = 'inserir_uma_hash_aqui_baseado_talvez_em_cookie'
        
        //this.user_data['round'][''] = 
        

    }
    // {
    //     id_move:1,
    //     state_data:{
    //        random_physical_var = new Array(),
    //        random_psyco_var = new Array()
    //     }
    // }

    reset() {
        this.col = Math.floor(randomModule.random() * 10);
        this.row = Math.floor(randomModule.random() * 10);
        this.moves = this.startMoves;
        $('#movesLeft').text(this.moves);
    }

    moveHandler(direction) {
        if (this.moves > 0) {
            this[direction]();
            console.log(this.user_data)
            $('#movesLeft').text(this.moves);
            maze.redraw();
        } else {
            this.create_user_structure()
            this.postData('https://safe-basin-68612.herokuapp.com/data',this.user_data).then(data => {
                console.log(data);
            });
            if (confirm('Obrigado por contribuir com este experimento científico!\n' +
            'Deseja jogar de novo para ajudar mais com a coleta de dados?')){onClick()}}
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
                this.user_data['moves'].push('up');
            }
    }

    down() {
            if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
                this.row += 1;
                this.moves -= 1;
                this.user_data['moves'].push('down');
            }
    }
    left() {
            if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
                this.col -= 1;
                this.moves -= 1;
                this.user_data['moves'].push('left');
            }
    }
    right() {
            if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
                this.col += 1;
                this.moves -= 1;
                this.user_data['moves'].push('right');
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