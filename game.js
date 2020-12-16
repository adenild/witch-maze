let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;
let reward;
let randomModule;
let seed;
let method;
let x_down = null;
let y_down = null;
let userData;
let userCookie;
let start_time_swipe, finish_time_swipe
let mapa;

function generateRandomBetween(n,a,b) {

    let numbersList = [];

    for (let i = 1; i <= n; ++i) {
        numbersList.push(Math.floor((a + randomModule.random() * (b-a))));
    }

    return numbersList
}

function checkRandomModule(seed, module) {
    if (module == 'Mersenne') {
        randomModule = new MersenneTwister(seed);
    } else if (module == 'random_batata') {
        randomModule = new random_batata(seed);
    }
    return randomModule
}

function getCookie() {
    if (document.cookie.indexOf('user_id') == -1) {
        document.cookie = 'user_id=' + String(seed);
    }
    return document.cookie
}

function getTouches(event) {
    return event.touches ||          // browser API
        event.originalEvent.touches; // jQuery
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
    let diff_swipe_time = finish_time_swipe - start_time_swipe
    let move_data = [x_down , y_down, x_up, y_up, diff_swipe_time];
    let move_type = 'swipe';

    if (Math.abs(x_diff) > Math.abs(y_diff)) {/*most significant*/
        if (x_diff > 0) {
            player.moveHandler("left", move_data, move_type)
        } else {
            player.moveHandler("right", move_data, move_type)
        }
    } else {
        if (y_diff > 0) {
            player.moveHandler("up", move_data, move_type)
        } else {
            player.moveHandler("down", move_data, move_type)
        }
    }
    x_down = null;
    y_down = null;
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

async function onLoad() {
    seed = new Date().getTime();
    method = 'Mersenne';
    randomModule = checkRandomModule(seed, method)
    userCookie = getCookie()

    userData = new UserData(seed, method, userCookie);
    userData.setDataStructure();

    canvas = document.getElementById('mainForm');
    ctx = canvas.getContext('2d');

    player = new Player(280);

    await player.loadPlayerImage();
    $('#movesLeft').text(player.moves)

    reward = new Reward();
    await reward.loadImages();

    mapa = await obtem_csv();
    maze = new Maze(10, 10, 50, mapa);

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
}

function loadReplay(oldData) {
    seed = oldData['seed'];
    method = oldData['method'];
    randomModule = checkRandomModule(seed, method);
    userCookie = oldData['userCookie'];
    moves = oldData.userDict['round']['direction'];

    userData = new UserData(seed, method, userCookie);
    userData.setDataStructure('controle');
    
    canvas = document.getElementById('mainForm');
    ctx = canvas.getContext('2d');

    player = new Player(280, true);
    player.loadPlayerImage();
    // $('#movesLeft').text(player.moves);

    reward = new Reward();
    reward.loadImages();

    maze = new Maze(10, 10, 50, mapa);

    player.control_simulator(moves);
    // document.addEventListener('keydown', onKeyDown);
    // document.addEventListener('touchstart', handleTouchStart, false);
    // document.addEventListener('touchmove', handleTouchMove, false);
}
