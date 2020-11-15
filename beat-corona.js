let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;

class Player {

  constructor(moves) {
    this.reset();
    this.startMoves = moves;
    this.moves = moves;
  }
  reset() {
    this.col = 0;
    this.row = 0;
    this.moves = this.startMoves;
    $('.moves-left').text(this.moves);
  }

  moveUp() {
    if (this.moves > 0) {
      if (!maze.cells[this.col][this.row].northWall && this.row !== 0) {
        this.row -= 1;
        this.moves -= 1;
        console.log("moves:", this.moves);
        console.log(this.col, this.row);
        $('.moves-left').text(this.moves);
      }
    } else { alert("Sem movimentos restantes! Deseja comprar mais?") }
  }

  moveDown() {
    if (this.moves > 0) {
      if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
        this.row += 1;
        this.moves -= 1;
        console.log("moves:", this.moves);
        console.log(this.col, this.row);
        $('.moves-left').text(this.moves);
      }
    } else { alert("Sem movimentos restantes! Deseja comprar mais?") }
  }

  moveLeft() {
    if (this.moves > 0) {
      if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
        this.col -= 1;
        this.moves -= 1;
        console.log("moves:", this.moves);
        console.log(this.col, this.row);
        $('.moves-left').text(this.moves);
      }
    } else { alert("Sem movimentos restantes! Deseja comprar mais?") }
  }

  moveRight() {
    if (this.moves > 0) {
      if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
        this.col += 1;
        this.moves -= 1;
        console.log("moves:", this.moves);
        console.log(this.col, this.row);
        $('.moves-left').text(this.moves);
      }
    } else { alert("Sem movimentos restantes! Deseja comprar mais?") }
  }

}

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

  constructor(cols, rows, cellSize) {

    this.backgroundColor = "#ffffff";
    this.cols = cols;
    this.endColor = "#88FF88";
    this.mazeColor = "#000000";
    this.playerColor = "#880088";
    this.rows = rows;
    this.cellSize = cellSize;
    this.newRewards = true; // -----------------------------------------------------------------------------------------------
    this.rewardsCoords = []; // -----------------------------------------------------------------------------------------------
    this.rewards = 0;
    this.nivel = 1;

    this.cells = [];


    this.generate()

  }

  generate() {

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

    this.redraw();

  }

  redraw() {

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, mazeHeight, mazeWidth);

    ctx.fillStyle = this.endColor;

    for (let i = 0; i < this.rewardsCoords.length; i++) {
      if (player.col == this.rewardsCoords[i][0] && player.row == this.rewardsCoords[i][1]) {
        this.rewards += 1;
        $('.rewards').text(this.rewards);
        console.log(this.rewards);
        this.rewardsCoords.splice(i, 1);
        if (this.rewardsCoords.length == 0) {
          this.newRewards = true;
          this.nivel += 1;
          $('.nivel').text(this.nivel);
        }
      }
    }

    if (this.newRewards) {
      let count = 0;
      while (count < (this.nivel*2)) {
        let rndCol = Math.floor(Math.random() * this.cols);
        let rndRow = Math.floor(Math.random() * this.rows);
        if (player.col != rndCol || player.row != rndRow) {
          this.rewardsCoords.push([rndCol, rndRow]);
          ctx.fillRect((rndCol) * this.cellSize + 5, (rndRow) * this.cellSize + 5, this.cellSize - 5, this.cellSize - 5);
          count += 1;
        }
      }
      this.newRewards = false
    } else {
      for (let i = 0; i < this.rewardsCoords.length; i++) {
        ctx.fillRect((this.rewardsCoords[i][0]) * this.cellSize + 5, (this.rewardsCoords[i][1]) * this.cellSize + 5, this.cellSize - 5, this.cellSize - 5);
      }
    }

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

function onClick() {
  player.reset();
  maze.cols = document.getElementById("cols").value;
  maze.rows = document.getElementById("rows").value;
  maze.generate();
}

function onControlClick(event) {
  switch (event.target.id) {
    case 'left':
      player.moveLeft()
      break;
    case 'right':
      player.moveRight()
      break;
    case 'down':
      player.moveDown()
      break;
    case 'up':
      player.moveUp()
      break;
    default:
      break;
  }
  maze.redraw();
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      player.moveLeft()
      break;
    case 39:
    case 68:
      player.moveRight()
      break;
    case 40:
    case 83:
      player.moveDown()
      break;
    case 38:
    case 87:
      player.moveUp()
      break;
    default:
      break;
  }
  maze.redraw();
}

function onLoad() {

  canvas = document.getElementById('mainForm');
  ctx = canvas.getContext('2d');

  player = new Player(200);
  maze = new Maze(10, 10, 50);
  $('.moves-left').text(player.moves)
  document.addEventListener('keydown', onKeyDown);
  document.getElementById('generate').addEventListener('click', onClick);
  document.getElementById('up').addEventListener('click', onControlClick);
  document.getElementById('right').addEventListener('click', onControlClick);
  document.getElementById('down').addEventListener('click', onControlClick);
  document.getElementById('left').addEventListener('click', onControlClick);
}
