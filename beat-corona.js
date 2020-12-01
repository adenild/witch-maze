let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;
let reward;
let randomModule;
let seed;

function create_user_structure(){

    //Variaveis internas de Round
    user_data = new Object();
    user_data['moves'] = new Array(); //Apagar depois que mudar no banco

    user_data['round'] = new Object();
    user_data['round']['moves'] = new Array();
    user_data['round']['level'] = new Array();
    user_data['round']['score'] = new Array();
    user_data['round']['direcao'] = new Array();
    user_data['round']['eixo'] = new Array();

    // Variaveis fixas
    user_data['version'] = 'v1'; //Finalizado - ALTERAR TODA VEZ QUE FIZEREM UMA NOVA VERSÃO
    user_data['seed'] = seed; //Finalizado
    user_data['used_alg'] = method; //Trocar para variável
    user_data['user_id'] = document.cookie; // Finalizado
    user_data['game_type'] = 'player'; // Finalizado

}

function onClick() {
  seed = new Date().getTime();
  //randomModule = new MersenneTwister(seed);
  randomModule = random_check(seed,method);
  player.reset();
  
  reward.reset();
  maze.cols = document.getElementById("cols").value;
  maze.rows = document.getElementById("rows").value;
  maze.generate();

  create_user_structure();
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
  method = 'Mersenne'
  randomModule = random_check(seed,method)
  //randomModule = new MersenneTwister(seed);
  if (document.cookie.indexOf('user_id') == -1) {
    document.cookie = 'user_id='+String(seed);
  };
  
  canvas = document.getElementById('mainForm');
  ctx = canvas.getContext('2d');

  player = new Player(200);
  create_user_structure();

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