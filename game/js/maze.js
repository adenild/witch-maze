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
    // noinspection JSUnresolvedVariable
    constructor(cols, rows, cellSize, map) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.cells = [];
        this.imagesCell = [];
        this.map = $.csv.toObjects(map);
        this.backgroundColor = "#d9d9d9";
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
                let randomCol = Math.floor(randomModule.random() * 10);
                let randomRow = Math.floor(randomModule.random() * 10);
                // Checa se o jogador está na casa, para nao colocar uma recompensa lá
                if (player.col !== randomCol || player.row !== randomRow) {
                    // Checa se existe recompensa naquela posição, se houver, gera outra.
                    reward.rewardsList.forEach(reward => {
                        if (compara_rewards(reward,[randomCol, randomRow, reward[2]])) {
                            same_position = true
                        }
                    });
                    if (same_position === true){
                        same_position = false
                        continue;
                    }
                    let aux_item = reward.generateRandomItem();
                    reward.rewardsList.push([randomCol, randomRow,aux_item]);
                    this.drawCell(
                        randomCol, randomRow, aux_item);
                    cont += 1;
                }
            }
            reward.newRewards = false;
        } else {
            for (let r = 0; r < reward.rewardsList.length; r++) {
                this.drawCell(
                    reward.rewardsList[r][0],
                    reward.rewardsList[r][1], reward.rewardsList[r][2])
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
        player.initialTime = new Date().getTime();
    }

    async drawCell(x_cell_position, y_cell_position, image_path) {
        // Função responsável por desenhar obstáculos
        let x_dimension = this.cellSize - 18
        let y_dimension = this.cellSize - 18
        let x_position = x_cell_position * this.cellSize + 5
        let y_position = y_cell_position * this.cellSize + 18

        let loaded, index = 0;
        for (let i=0; i<this.imagesCell.length; i++){
            let auxiliar_path = image_path.split("/");
            let auxiliar_imageSrc = this.imagesCell[i].src.split("/");
            if (auxiliar_imageSrc[auxiliar_imageSrc.length-1] == auxiliar_path[auxiliar_path.length-1]){
                loaded = 1;
                index = i;
                break
            }
        }
        if (loaded == 1){
            ctx.drawImage(this.imagesCell[index], x_position, y_position,
                x_dimension, y_dimension)
        }else {
            let img = new Image;
            img.addEventListener('load', function (){ ctx.drawImage(img, x_position, y_position, x_dimension, y_dimension)}, false);
            img.src = image_path;
            this.imagesCell.push(img)
        }

    }
    drawCellPlayer(x_cell_position, y_cell_position, image_path) {
        // Função responsável por desenhar obstáculos
        let x_dimension = this.cellSize - 5
        let y_dimension = this.cellSize - 5
        let x_position = x_cell_position * this.cellSize + 5
        let y_position = y_cell_position * this.cellSize + 5

        ctx.drawImage(image_path, x_position, y_position,
            x_dimension, y_dimension);
    }

    redraw() {
        // Função responsável por desenhar no ecrã
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, mazeHeight, mazeWidth);
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
        this.drawCellPlayer(player.col, player.row, player.image[0]);
    }
}