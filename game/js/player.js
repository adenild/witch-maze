class Player {
    constructor(moves) {
        this.reset();
        this.startMoves = moves;
        this.moves = moves;
        this.image = [];
        this.valid = false;
        this.initialTime = null;
    }
    reset() {
        this.col = Math.floor(randomModule.random() * 10);
        this.row = Math.floor(randomModule.random() * 10);
        this.moves = this.startMoves;
        $('#movesLeft').text(this.moves);
    }
    async loadPlayerImage() {
        let img = new Image();
        img.src = 'assets/src/sprites/mio_static.gif';
        await this.image.push(img);
    }

    // Banco de dados: 'https://safe-basin-68612.herokuapp.com/data'
    saveUserData(valid, direction, move_data=[], move_type='keyboard') {
        if (valid) {
            maze.redraw();
            //Variáveis psicológicas
            let dateAux = new Date().getTime();
            userData.userDict['round']['timeStep'].push(dateAux - this.initialTime);
            this.initialTime = dateAux;


            if (move_type == 'swipe'){
                let startPos = move_data.slice(0,2);
                let finishPos = move_data.slice(2,4);

                userData.userDict['round']['swipeDistance'].push(euclideanDistance(startPos,finishPos));
                userData.userDict['round']['swipeCoordStart'].push(startPos);
                userData.userDict['round']['swipeCoordFinish'].push(finishPos);
                userData.userDict['round']['swipeTime'].push(move_data[4]);
            }
            
            //Outras variáveis
            userData.userDict['round']['moves'].push(this.startMoves - this.moves);
            userData.userDict['round']['level'].push(reward.level);
            userData.userDict['round']['score'].push(reward.rewardsScore);
            userData.userDict['round']['direction'].push(direction);
            if (direction == ('up') || direction == 'down') {
                userData.userDict['round']['axis'].push('vertical')
            } else {
                userData.userDict['round']['axis'].push('horizontal')
            }

            //Variáveis físicas

            userData.userDict['round']['V1Score'].push(reward.fourScoreVariables[0]);
            userData.userDict['round']['V2Score'].push(reward.fourScoreVariables[1]);
            userData.userDict['round']['V3Score'].push(reward.fourScoreVariables[2]);
            userData.userDict['round']['V4Score'].push(reward.fourScoreVariables[3]);
            userData.userDict['round']['magicScore'].push(reward.magicScore);
            console.log('Seu score mágico é:',reward.magicScore,'!!')

            /*let rewardColorList = [];
            let rewardLocation = [];
            let rewardSize = [];
            let rewardType = [];
            for (let r = 0; r < reward.rewardsList.length; r++) {
                rewardLocation.push([reward.rewardsList[r][0], reward.rewardsList[r][1]]);
                rewardColorList.push([reward.rewardsList[r][2]]);
                //rewardSize.push(reward.rewardsList[r][preencher])
                //rewardType.push(reward.rewardsList[r][preencher])
            }
            userData.userDict['round']['rewardLocation'].push(rewardLocation);
            userData.userDict['round']['rewardColor'].push(rewardColorList);
            userData.userDict['round']['rewardSize'].push()
            userData.userDict['round']['rewardType'].push()*/
            this.valid = false
        }
    }
    async postData(url = '', data = {}) {
        const response = await fetch(url, {
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

    moveHandler(direction, move_data=[], move_type='keyboard') {
        if (this.moves > 0) {
            this[direction]();
            this.saveUserData(this.valid, direction, move_data, move_type)
            $('#movesLeft').text(this.moves);
        } else {
            if (confirm('Obrigado por contribuir com este experimento científico!\n' +
                'Deseja jogar de novo para ajudar mais com a coleta de dados?')) {
                console.log(userData.userDict)
                this.postData('https://safe-basin-68612.herokuapp.com/data', userData.userDict).then(response => console.log(response)) //"Dados enviados! Obrigado"));
                onClick();
            }
        }
    }
    up() {
        if (!maze.cells[this.col][this.row].northWall && this.row !== 0) {
            this.row -= 1;
            this.moves -= 1;
            this.valid = true;
        }
    }
    down() {
        if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
            this.row += 1;
            this.moves -= 1;
            this.valid = true;
        }
    }
    left() {
        if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
            this.col -= 1;
            this.moves -= 1;
            this.valid = true;
        }
    }
    right() {
        if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
            this.col += 1;
            this.moves -= 1;
            this.valid = true;
        }
    }
}
