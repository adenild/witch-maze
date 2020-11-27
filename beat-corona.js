let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;
let reward;
let randomModule;
let seed;

function onClick() {
  seed = new Date().getTime();
  //randomModule = new MersenneTwister(seed);
  randomModule = random_check(seed,'Mersenne');
  player.reset();

  player.user_data['seed'] = seed;
  player.user_data['used_alg'] = 'Mersenne';
  
  reward.reset();
  maze.cols = document.getElementById("cols").value;
  maze.rows = document.getElementById("rows").value;
  maze.generate();
}

function onControlClick(event) {
  player.moveHandler(event.target.id)
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      player.moveHandler("left")
      break;
    case 39:
    case 68:
      player.moveHandler("right")
      break;
    case 40:
    case 83:
      player.moveHandler("down")
      break;
    case 38:
    case 87:
      player.moveHandler("up")
      break;
    default:
      break;
  }
  maze.redraw();
}

//Como vai ser definido se qual metodo vamos utilizar, e se for utilizado varios como sera a escolha.
function random_check (seed,method) {
  if (method == 'Mersenne') {
    randomModule = new MersenneTwister(seed);
  } else if (method == 'random_batata') {
    randomModule = new random_batata(seed);
  }
  return randomModule
}

async function onLoad() {

  seed = new Date().getTime();
  randomModule = random_check(seed,'Mersenne')
  //randomModule = new MersenneTwister(seed);
  if (document.cookie.indexOf('user_id') == -1) {
    document.cookie = 'user_id='+String(seed);
  };
  
  canvas = document.getElementById('mainForm');
  ctx = canvas.getContext('2d');

  player = new Player(20);
  player.user_data['seed'] = seed;
  player.user_data['used_alg'] = 'Mersenne';
  player.user_data['user_id'] = document.cookie;
  
  $('#movesLeft').text(player.moves)

  reward = new Reward();
  maze = new Maze(10, 10, 50, await obtem_csv());

  document.addEventListener('keydown', onKeyDown);
  document.getElementById('generate').addEventListener('click', onClick);
  document.getElementById('up').addEventListener('click', onControlClick);
  document.getElementById('right').addEventListener('click', onControlClick);
  document.getElementById('down').addEventListener('click', onControlClick);
  document.getElementById('left').addEventListener('click', onControlClick);
}