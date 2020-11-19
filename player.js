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

    moveUp() {
        if (this.moves > 0) {
            if (!maze.cells[this.col][this.row].northWall && this.row !== 0) {
                this.row -= 1;
                this.moves -= 1;
                $('#movesLeft').text(this.moves);
            }
        } else {if (confirm("Sem movimentos restantes! Deseja jogar novamente?")){window.location.reload()}}
    }
    moveDown() {
        if (this.moves > 0) {
            if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
                this.row += 1;
                this.moves -= 1;
                $('#movesLeft').text(this.moves);
            }
        } else {if (confirm("Sem movimentos restantes! Deseja jogar novamente?")){window.location.reload()}}
    }
    moveLeft() {
        if (this.moves > 0) {
            if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
                this.col -= 1;
                this.moves -= 1;
                $('#movesLeft').text(this.moves);
            }
        } else {if (confirm("Sem movimentos restantes! Deseja jogar novamente?")){window.location.reload()}}
    }
    moveRight() {
        if (this.moves > 0) {
            if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
                this.col += 1;
                this.moves -= 1;
                $('#movesLeft').text(this.moves);
            }
        } else {if (confirm("Sem movimentos restantes! Deseja jogar novamente?")){window.location.reload()}}
    }
}