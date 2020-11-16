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
    } else {alert("Sem movimentos restantes! Deseja comprar mais?")}
  }
  moveDown() {
    if (this.moves > 0) {
      if (!maze.cells[this.col][this.row].southWall && this.row !== maze.rows - 1) {
        this.row += 1;
        this.moves -= 1;
        $('#movesLeft').text(this.moves);
      }
    } else {alert("Sem movimentos restantes! Deseja comprar mais?")}
  }
  moveLeft() {
    if (this.moves > 0) {
      if (!maze.cells[this.col][this.row].westWall && this.col !== 0) {
        this.col -= 1;
        this.moves -= 1;
        $('#movesLeft').text(this.moves);
      }
    } else {alert("Sem movimentos restantes! Deseja comprar mais?")}
  }
  moveRight() {
    if (this.moves > 0) {
      if (!maze.cells[this.col][this.row].eastWall && this.col !== maze.cols - 1) {
        this.col += 1;
        this.moves -= 1;
        $('#movesLeft').text(this.moves);
      }
    } else {alert("Sem movimentos restantes! Deseja comprar mais?")}
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
  constructor(cols, rows, cellSize, map) {
    this.reset();

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

    for (let map_index = 0; map_index < 100; map_index++) {
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

    let rndCol = Math.floor(Math.random() * this.cols);
    let rndRow = Math.floor(Math.random() * this.rows);

    let stack = [];
    stack.push(this.cells[rndCol][rndRow]);

    this.redraw();
  }
  checkRewardsPosition(rewardsList,randomCol,randomRow){
      for(let index = 0;index<rewardsList.length;index++){
        if(rewardsList[index][0] == randomCol && rewardsList[index][1] == randomRow)
            return true;
      }

      return false;

  }
  spawnRewards() {
    if (this.newRewards) {
      let cont = 0;
      while (cont < (this.level*2)) {
        let randomCol = Math.floor(Math.random() * this.cols);
        let randomRow = Math.floor(Math.random() * this.rows);
        while(this.checkRewardsPosition(this.rewardsList,randomCol,randomRow)){
          let randomCol = Math.floor(Math.random() * this.cols);
          let randomRow = Math.floor(Math.random() * this.rows);
        }
        // Checa se o jogador está na casa, para nao colocar uma recompensa lá
        if (player.col !== randomCol || player.row !== randomRow) {
          this.rewardsList.push([randomCol, randomRow]);

          ctx.fillRect((randomCol)*this.cellSize+5, (randomRow)*this.cellSize+5, this.cellSize-5, this.cellSize-5);
          cont += 1;
        }
      }
      this.newRewards = false;
    } else {
      for (let r = 0; r < this.rewardsList.length; r++) {
        ctx.fillRect((this.rewardsList[r][0])*this.cellSize+5, (this.rewardsList[r][1])*this.cellSize+5, this.cellSize-5, this.cellSize-5);
      }
    }
  }

  countScore() {
    for (let r = 0; r < this.rewardsList.length; r++) {
      if (player.col === this.rewardsList[r][0] && player.row === this.rewardsList[r][1]) {
        this.rewardsScore += 1;
        $("#rewardsScore").text(this.rewardsScore);
        this.rewardsList.splice(r, 1);
        if (this.rewardsList.length === 0) {
          this.newRewards = true;
          this.level += 1;
          $("#level").text(this.level);
        }
      }
    }
  }

  redraw() {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, mazeHeight, mazeWidth);

    ctx.fillStyle = this.endColor;

    this.countScore()
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

  reset() {
    this.newRewards = true;
    this.rewardsList = [];
    this.rewardsScore = 0;
    this.level = 1;
    $("#level").text(this.level);
    $("#rewardsScore").text(this.rewardsScore);
  }
}

function onClick() {
  player.reset();
  maze.reset();
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

async function onLoad() {

  canvas = document.getElementById('mainForm');
  ctx = canvas.getContext('2d');

  player = new Player(200);
  // $('#movesLeft').text(player.moves)

  maze = new Maze(10, 10, 50, await obtem_csv());


  document.addEventListener('keydown', onKeyDown);
  document.getElementById('generate').addEventListener('click', onClick);
  document.getElementById('up').addEventListener('click', onControlClick);
  document.getElementById('right').addEventListener('click', onControlClick);
  document.getElementById('down').addEventListener('click', onControlClick);
  document.getElementById('left').addEventListener('click', onControlClick);
}

async function obtem_csv(){
  return $.ajax({
    type: "GET",
    url: "grid/cenario_teste.csv",
    success: function (data) {
      csv_novo(data).then(r => console.log("Consegui!"))
    }
  })
}

async function csv_novo(allText){
  return $.csv.toObjects(allText)
}

function maze_generator(maze_data,maze){
  let col;
  let row;
  for (let obj_index = 0; obj_index < maze_data.length; obj_index++) {
    col = maze_data[obj_index]['Col']
    row = maze_data[obj_index]['Row']
  }
  //maze.cells[col][row] = new MazeCell(col, row);
  console.log(maze)
  }
