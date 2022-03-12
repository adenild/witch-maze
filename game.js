let ctx, canvas, maze, player, reward, mapa;
let mazeHeight, mazeWidth;
let method;
let seed, seed2;
let randomModule, randomModule2;
let randomModuleQuant, randomModuleQuant2;
let x_down = null,
  y_down = null;
let start_time_swipe, finish_time_swipe;
let userData, user_id, cookies, moves;

function generateRandomBetween(n, a, b, method) {
  let numbersList = [];
  if (method == "MERSENNE") {
    for (let i = 1; i <= n; ++i) {
      numbersList.push(
        parseFloat((a + randomModule2.random() * (b - a)).toFixed(3))
      );
    }
  } else {
    // Quantico
    return randomModuleQuant.random(player.isBot);
  }

  return numbersList;
}

function getCookie() {
  if (document.cookie.indexOf("user_id") == -1) {
    document.cookie = "user_id=" + String(seed);
  }
  return document.cookie;
}

function getTouches(event) {
  return (
    event.touches || // browser API
    event.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(event) {
  const firstTouch = getTouches(event)[0];
  x_down = firstTouch.clientX;
  y_down = firstTouch.clientY;
  start_time_swipe = new Date().getTime();
}

function handleTouchMove(event) {
  if (!x_down || !y_down) {
    return;
  }

  let x_up = event.touches[0].clientX;
  let y_up = event.touches[0].clientY;
  finish_time_swipe = new Date().getTime();

  let x_diff = x_down - x_up;
  let y_diff = y_down - y_up;

  //x_up,y_up,x_down,y_down
  let diff_swipe_time = finish_time_swipe - start_time_swipe;
  let move_data = [x_down, y_down, x_up, y_up, diff_swipe_time];
  let move_type = "swipe";

  if (Math.abs(x_diff) > Math.abs(y_diff)) {
    /*most significant*/
    if (x_diff > 0) {
      player.moveHandler("left", move_data, move_type);
    } else {
      player.moveHandler("right", move_data, move_type);
    }
  } else {
    if (y_diff > 0) {
      player.moveHandler("up", move_data, move_type);
    } else {
      player.moveHandler("down", move_data, move_type);
    }
  }
  x_down = null;
  y_down = null;
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      player.moveHandler("left");
      break;
    case 39:
    case 68:
      player.moveHandler("right");
      break;
    case 40:
    case 83:
      player.moveHandler("down");
      break;
    case 38:
    case 87:
      player.moveHandler("up");
      break;
    default:
      break;
  }
}

class EasyCookies {
  constructor() {
    this.localStorage = new localStorage();
  }

  get(key) {
    return this.localStorage.getItem(key);
  }

  set(key, value) {
    this.localStorage.setItem(key, value);
  }
}

function choose_random_method(localStorage) {
  let choices = ["MERSENNE", "ANUQRNG"];
  let prev = localStorage.getItem("previousMethod");
  if (prev) {
    choices.splice(choices.indexOf(prev), 1);
  }
  let choice = choices[Math.floor(choices.length * Math.random())];
  localStorage.setItem("previousMethod", choice);
  return choice;
}

async function onLoad() {
  seed = new Date().getTime();
  seed2 = new Date().getTime() + (Math.random() * (9 - 1) + 1);

  randomModule = new MersenneTwister(seed);
  randomModule2 = new MersenneTwister(seed2);
  randomModuleQuant = new AnuQRNG(seed);
  user_id = localStorage.getItem("user_id");
  if (!user_id) {
    user_id = seed;
    localStorage.setItem("user_id", user_id);
  }
  method = choose_random_method(localStorage);

  userData = new UserData(seed, method, user_id);
  userData.setDataStructure();

  canvas = document.getElementById("mainForm");
  ctx = canvas.getContext("2d");

  player = new Player(240);

  await player.loadPlayerImage();
  $("#movesLeft").text(player.moves);

  reward = new Reward();

  mapa = await obtem_csv();
  maze = new Maze(10, 10, 50, mapa);

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);
}

function loadReplay(oldData) {
  seed = oldData["seed"];
  method = oldData["method"];

  randomModule = new MersenneTwister(seed);
  randomModuleQuant = new AnuQRNG(seed, "controle");

  user_id = oldData.userDict["user_id"];
  moves = oldData.userDict["round"]["direction"];

  userData = new UserData(seed, method, user_id);
  userData.setDataStructure("controle");

  canvas = document.getElementById("mainForm");
  ctx = canvas.getContext("2d");

  player = new Player(240, true);
  player.loadPlayerImage();
  // $('#movesLeft').text(player.moves);
  if (player.isBot) {
    //console.log("verifiquei se é bot e é memo")
    reward = new Reward(true);
  } else {
    reward = new Reward();
  }

  maze = new Maze(10, 10, 50, mapa);

  player.control_simulator(moves);
  // console.log(reward.magicScore)
  // document.addEventListener('keydown', onKeyDown);
  // document.addEventListener('touchstart', handleTouchStart, false);
  // document.addEventListener('touchmove', handleTouchMove, false);
}
