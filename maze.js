class MazeCell {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.eastWall = false;
        this.northWall = false;
        this.southWall = false;
        this.westWall = false;
    }
}

class Maze {
    constructor(cols, rows, cellSize, map) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.cells = [];
        this.map = $.csv.toObjects(map);

        this.backgroundColor = "#ffffff";
        this.endColor = "#88FF88";
        this.mazeColor = "#000000";
        this.playerColor = "#880088";

        this.generate()
    }

    spawnRewards() {
        if (reward.newRewards) {
            let cont = 0;
            let same_position = false
            while (cont < (reward.level*2)) {
                let randomCol = Math.floor(randomModule.random() * this.cols);
                let randomRow = Math.floor(randomModule.random() * this.rows);
                // Checa se o jogador está na casa, para nao colocar uma recompensa lá
                if (player.col !== randomCol || player.row !== randomRow) {
                    // Checa se existe recompença naquela posição, se houver, gera outra.
                    reward.rewardsList.forEach(reward => {
                        if (compara_rewards(reward,[randomCol, randomRow, reward[2]])) {
                            same_position = true
                        }
                    });
                    if (same_position === true){
                        same_position = false
                        continue;
                    }
                    let aux_color = reward.generateRandomColor();
                    reward.rewardsList.push([randomCol, randomRow,aux_color]);
                    ctx.fillStyle = aux_color;
                    ctx.fillRect((randomCol)*this.cellSize+5, (randomRow)*this.cellSize+5, this.cellSize-5, this.cellSize-5);
                    cont += 1;
                }
            }
            reward.newRewards = false;
        } else {
            for (let r = 0; r < reward.rewardsList.length; r++) {
                ctx.fillStyle = reward.rewardsList[r][2];
                ctx.fillRect((reward.rewardsList[r][0])*this.cellSize+5, (reward.rewardsList[r][1])*this.cellSize+5, this.cellSize-5, this.cellSize-5);
            }
        }
    }

    async generate() {
        mazeHeight = this.rows * this.cellSize;
        mazeWidth = this.cols * this.cellSize;

        canvas.height = mazeHeight;
        canvas.width = mazeWidth;
        canvas.style.height = mazeHeight;
        canvas.style.width = mazeWidth;

        for (let col = 0; col < this.cols; col++) {
            this.cells[col] = [];
            for (let row = 0; row < this.rows; row++) {
                this.cells[col][row] = new MazeCell(col, row);
            }
        }

        for (let map_index = 0; map_index < this.cols*this.rows; map_index++) {
            if (this.map[map_index].EastWall == 1) {
                this.cells[this.map[map_index].Col-1][this.map[map_index].Row-1].eastWall = true;
            }
            if (this.map[map_index].NorthWall == 1) {
                this.cells[this.map[map_index].Col-1][this.map[map_index].Row-1].northWall = true;
            }
            if (this.map[map_index].SouthWall == 1) {
                this.cells[this.map[map_index].Col-1][this.map[map_index].Row-1].southWall = true;
            }
            if (this.map[map_index].WestWall == 1) {
                this.cells[this.map[map_index].Col-1][this.map[map_index].Row-1].westWall = true;
            }
        }

        this.redraw();
    }

    redraw() {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, mazeHeight, mazeWidth);

        ctx.fillStyle = this.endColor;

        reward.countScore()
        this.spawnRewards()

        ctx.strokeStyle = this.mazeColor;
        ctx.strokeRect(0, 0, mazeHeight, mazeWidth);

        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.cells[col][row].eastWall) {
                    ctx.beginPath();
                    ctx.moveTo((col + 1) * this.cellSize, row * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].northWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, row * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, row * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].southWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, (row + 1) * this.cellSize);
                    ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
                if (this.cells[col][row].westWall) {
                    ctx.beginPath();
                    ctx.moveTo(col * this.cellSize, row * this.cellSize);
                    ctx.lineTo(col * this.cellSize, (row + 1) * this.cellSize);
                    ctx.stroke();
                }
            }
        }

        ctx.fillStyle = this.playerColor;
        ctx.fillRect((player.col * this.cellSize) + 5, (player.row * this.cellSize) + 5, this.cellSize - 5, this.cellSize - 5);
    }
}