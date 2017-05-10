var map = new Array(10);
for (var i = 0; i < 10; i++) {
  map[i] = new Array(10);
}
// Create 2 dimentional array


createMap();

function createMap() {
  // This function fills in the map where you can walk and not
  createOutsideWall();
  createPacman();
  var div;
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      div = document.createElement("div");

      div.innerHTML = i + "," + t;
      div.id = i + "," + t;

      if (map[i][t] == 0) {
        div.className = "border";
      }
      else if (map[i][t] == "p") {
        div.className = "pacman"
      }
      else {
        div.className = "walk";
      }

      if (t === 9) {

      }
      else if (t != 9) {
        div.className += " bord_part";
      }
      div.className += " bord";
      document.getElementById("map").appendChild(div);
    }
  }
}
document.addEventListener("keypress", movePaceman);
function movePaceman(event) {
  // w = 119
  // d = 100
  // s = 115
  // a = 97
  var keypress = event.keyCode;

  if (keypress == 119) {
    // UP
    validateMove("up");
  }
  else if (keypress == 115) {
    // down
    validateMove("down");
  }
  else if (keypress == 97) {
    // left
    validateMove("left");
  }
  else if (keypress == 100) {
    // right
    validateMove("right");
  }
}
function validateMove(direction) {
  var PacmanLocation = getPacmanLocation();
  PacmanLocationX = PacmanLocation[1];
  PacmanLocationY = PacmanLocation[0];
  console.log("X: "+ PacmanLocationX);
  console.log("Y: "+ PacmanLocationY);
  console.log(direction);

  if (direction == "up") {
    if (map[PacmanLocationY - 1][PacmanLocationX] != 0 && map[PacmanLocationY - 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY - 1][PacmanLocationX] = "p";
      map[PacmanLocationY][PacmanLocationX] = 1;
      renderPage();
    }
  }
  else if (direction == "down") {
    if (map[PacmanLocationY + 1][PacmanLocationX] != 0 && map[PacmanLocationY + 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY + 1][PacmanLocationX] = "p";
      map[PacmanLocationY][PacmanLocationX] = 1;
      renderPage();
    }
  }
  else if (direction == "left") {
    if (map[PacmanLocationY][PacmanLocationX - 1] != 0 && map[PacmanLocationY][PacmanLocationX - 1] != "undefined") {
      map[PacmanLocationY][PacmanLocationX - 1] = "p";
      map[PacmanLocationY][PacmanLocationX] = 1;
      renderPage();
    }
  }
  else if (direction == "right") {
    if (map[PacmanLocationY][PacmanLocationX + 1] != 0 && map[PacmanLocationY][PacmanLocationX + 1] != "undefined") {
      map[PacmanLocationY][PacmanLocationX + 1] = "p";
      map[PacmanLocationY][PacmanLocationX] = 1;
      renderPage();
    }
  }
}
function getPacmanLocation() {
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      if (map[i][t] == "p") {
        return([i, t]);
      }
    }
  }
}
function createOutsideWall() {
  // This function create a border around the map
  map[0][0] = 0;
  map[0][1] = 0;
  map[0][2] = 0;
  map[0][3] = 0;
  map[0][4] = 0;
  map[0][5] = 0;
  map[0][6] = 0;
  map[0][7] = 0;
  map[0][8] = 0;
  map[0][9] = 0;
  // Top border

  map[9][0] = 0;
  map[9][1] = 0;
  map[9][2] = 0;
  map[9][3] = 0;
  map[9][4] = 0;
  map[9][5] = 0;
  map[9][6] = 0;
  map[9][7] = 0;
  map[9][8] = 0;
  map[9][9] = 0;
  // Bottom border

  map[0][9] = 0;
  map[1][9] = 0;
  map[2][9] = 0;
  map[3][9] = 0;
  map[4][9] = 0;
  map[5][9] = 0;
  map[6][9] = 0;
  map[7][9] = 0;
  map[7][9] = 0;
  map[8][9] = 0;
  // right border

  map[0][0] = 0;
  map[1][0] = 0;
  map[2][0] = 0;
  map[3][0] = 0;
  map[4][0] = 0;
  map[5][0] = 0;
  map[6][0] = 0;
  map[7][0] = 0;
  map[8][0] = 0;
  map[9][0] = 0;
  // left
  // Wall is 0
  // Walkable path is 1
  // Points ball is 2
  // pacman is p
}

function createPacman() {
  map[5][4] = "p";
}
function renderPage() {
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      var div = document.getElementById(i + "," + t);

      if (map[i][t] == 0) {
        div.className = "border";
      }
      else if (map[i][t] == "p") {
        div.className = "pacman"
      }
      else {
        div.className = "walk";
      }

      if (t === 9) {

      }
      else if (t != 9) {
        div.className += " bord_part";
      }
      div.className += " bord";
    }
  }
}