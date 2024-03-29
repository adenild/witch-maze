function compara_rewards(array1, array2) {
  if (array1.length != array2.length) {
    return false;
  } else {
    for (let index = 0; index < array1.length; index++) {
      if (array1[index] != array2[index]) {
        return false;
      }
    }
    return true;
  }
}

async function obtem_csv() {
  return $.ajax({
    type: "GET",
    url: "grid/cenario_teste.csv",
    success: function (data) {
      csv_novo(data);
    },
  });
}

async function csv_novo(allText) {
  return $.csv.toObjects(allText);
}

function maze_generator(maze_data) {
  let col;
  let row;
  for (let obj_index = 0; obj_index < maze_data.length; obj_index++) {
    col = maze_data[obj_index]["Col"];
    row = maze_data[obj_index]["Row"];
  }
}

class UserData {
  constructor(seed, method, userCookie) {
    this.userDict = {};
    this.seed = seed;
    this.method = method;
    this.userCookie = userCookie;
  }

  setDataStructure(player_status = "player") {
    let d = new Date();
    let now = `${d.getFullYear()}/${
      d.getMonth() + 1
    }/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getTime()}`;

    // Variaveis internas de Round
    //this.userDict['moves'] = []; // TODO: Apagar depois que mudar no banco

    // Outras variáveis
    this.userDict["round"] = {};
    this.userDict["round"]["moves"] = [];
    this.userDict["round"]["level"] = [];
    this.userDict["round"]["score"] = [];
    this.userDict["round"]["direction"] = [];
    this.userDict["round"]["axis"] = [];

    // Variáveis físicas
    this.userDict["round"]["V1Score"] = [];
    this.userDict["round"]["V2Score"] = [];
    this.userDict["round"]["V3Score"] = [];
    this.userDict["round"]["V4Score"] = [];
    this.userDict["round"]["magicScore"] = [];
    /*this.userDict['round']['rewardColor'] = [];
        this.userDict['round']['rewardSize'] = [];
        this.userDict['round']['rewardLocation'] = [];
        this.userDict['round']['rewardType'] = [];
        this.userDict['round']['rewardType'] = [];*/

    // Variáveis psicológicas
    this.userDict["round"]["swipeDistance"] = [];
    this.userDict["round"]["timeStep"] = [];
    this.userDict["round"]["swipeTime"] = [];
    this.userDict["round"]["swipeCoordXStart"] = [];
    this.userDict["round"]["swipeCoordYStart"] = [];
    this.userDict["round"]["swipeCoordXFinish"] = [];
    this.userDict["round"]["swipeCoordYFinish"] = [];

    // Variaveis fixas
    this.userDict["version"] = "1.0.3"; // Versão para testes
    this.userDict["game_date"] = now;
    this.userDict["seed"] = this.seed; // Finalizado
    this.userDict["used_alg"] = this.method; // Trocar para variável
    this.userDict["user_id"] = this.userCookie; // Pega o user_id gerado no cookie
    this.userDict["finalScore"] = 0;
    this.userDict["game_type"] = player_status; // Finalizado
  }
}

function euclideanDistance(startPos, finishPos) {
  return Math.sqrt(
    startPos.reduce((acc, val, i) => acc + Math.pow(val - finishPos[i], 2), 0)
  );
}

function sleepFor(sleepDuration) {
  let now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
