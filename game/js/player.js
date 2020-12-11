class Player {
    constructor(moves) {
        this.reset();
        this.startMoves = moves;
        this.moves = moves;
        this.image=[];
    }
    async loadPlayerImage(){
        let img = new Image();
        img.src = 'assets/src/sprites/mio_static.gif';
        img.addEventListener('load', e=>{

        });
        await this.image.push(img);
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
            $('#movesLeft').text(this.moves);
            maze.redraw();
        } else {if (confirm('Obrigado por contribuir com este experimento científico!\n' +
            'Deseja jogar de novo para ajudar mais com a coleta de dados?')){onClick()}}
    }

    up() {
            if (!maze.cells[this.col][this.row].northWall && this.row !== 0) {
                this.row -= 1;
                this.moves -= 1;
            }
        }

    down() {
            if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
                this.row += 1;
                this.moves -= 1;
            }
    }
    left() {
            if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
                this.col -= 1;
                this.moves -= 1;
            }
    }
    right() {
            if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
                this.col += 1;
                this.moves -= 1;
            }
    }
}