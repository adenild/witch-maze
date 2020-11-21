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
        } else {if (confirm('Obrigado por contribuir com este experimento científico!\n' +
        'Deseja jogar de novo para ajudar mais com a coleta de dados?')){onClick()}}
    }
    moveDown() {
        if (this.moves > 0) {
            if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
                this.row += 1;
                this.moves -= 1;
                $('#movesLeft').text(this.moves);
            }
        } else {if (confirm('Obrigado por contribuir com este experimento científico!\n' +
        'Deseja jogar de novo para ajudar mais com a coleta de dados?')){onClick()}}
    }
    moveLeft() {
        if (this.moves > 0) {
            if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
                this.col -= 1;
                this.moves -= 1;
                $('#movesLeft').text(this.moves);
            }
        } else {if (confirm('Obrigado por contribuir com este experimento científico!\n' +
        'Deseja jogar de novo para ajudar mais com a coleta de dados?')){onClick()}}
    }
    moveRight() {
        if (this.moves > 0) {
            if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
                this.col += 1;
                this.moves -= 1;
                $('#movesLeft').text(this.moves);
            }
        } else {if (confirm('Obrigado por contribuir com este experimento científico!\n' +
        'Deseja jogar de novo para ajudar mais com a coleta de dados?')){onClick()}}
    }
}