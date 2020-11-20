class Player {
    constructor(moves) {
        this.reset();
        this.startMoves = moves;
        this.moves = moves;
    }
    reset() {
        this.col = Math.floor(Math.random() * 10);
        this.row = Math.floor(Math.random() * 10);
        this.moves = this.startMoves;
        $('#movesLeft').text(this.moves);
    }

    moveHandler(direction) {
        if (this.moves > 0) {
            this[direction]();
            this.moves -= 1;
            $('#movesLeft').text(this.moves);
            maze.redraw();
        } else {
            alert('Sem movimentos restantes! Deseja jogar novamente?')
        }
    }

    up() {
            if (!maze.cells[this.col][this.row].northWall && this.row !== 0) {
                this.row -= 1;
            }
        }

    down() {
            if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
                this.row += 1;
            }
    }
    left() {
            if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
                this.col -= 1;
            }
    }
    right() {
            if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
                this.col += 1;
            }
    }
}