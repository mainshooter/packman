var map = new Array(10);
for (var i = 0; i < 10; i++) {
  map[i] = new Array(10);
}
var score = 0;
// Create 2 dimentional array

var timer = 0;
// This function keeps trac of the time left of eating a ghost

var ghostEatable = 0;

var lives = 3;
// The lives of pacman

createMap();

function createMap() {
  // This function fills in the map where you can walk and not
  createOutsideWall();
  createPoints();
  createPacman();
  createGhostEating();
  createGhost();

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
      else if (map[i][t] == 2) {
        div.className = "point";
      }
      else if (map[i][t] == 3) {
        div.className = "ghostPil";
      }
      else if (map[i][t] == 4) {
        div.className = "ghost";
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
function createGhost() {
  // Creates a ghost
  map[3][8] = 4;
}
function validateMove(direction) {
  var PacmanLocation = getPacmanLocation();
  PacmanLocationX = PacmanLocation[1];
  PacmanLocationY = PacmanLocation[0];
  console.log("X: "+ PacmanLocationX);
  console.log("Y: "+ PacmanLocationY);
  console.log(direction);
  checkForPointAndGhostEating(direction);

  if (checkIfPacmanDies(direction) == false) {
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
  else {
    // Pacman dies
    pacmanDies();
  }
  // Check after the move if we have a point
}
function checkIfPacmanDies(direction) {
  // This function checks if pacman dies
  // It checks if pacman touch a ghost
  var pacmanLocation = getPacmanLocation();
  var ghostLocation = getGhostLocation();

  console.log("PACMAN DIES: " + getPacmanLocation());

  var PacmanLocationX = pacmanLocation[1];
  var pacmanLocationY = pacmanLocation[0];

  console.log("direction: "+ direction);

  if (direction == "up") {
    if (map[pacmanLocationY - 1][PacmanLocationX] == 4 || map[pacmanLocationY - 1][PacmanLocationX] == 5 && map[pacmanLocationY - 1][PacmanLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "down") {
    if (map[pacmanLocationY + 1][PacmanLocationX] == 4 || map[pacmanLocationY - 1][PacmanLocationX] == 5 && map[pacmanLocationY + 1][PacmanLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "left") {
    if (map[pacmanLocationY][PacmanLocationX - 1] == 5 || map[pacmanLocationY - 1][PacmanLocationX] == 4 && map[pacmanLocationY][PacmanLocationX - 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "right") {
    if (map[pacmanLocationY][PacmanLocationX + 1] == 4 || map[pacmanLocationY - 1][PacmanLocationX] == 5 && map[pacmanLocationY][PacmanLocationX + 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }


  if (pacmanLocation[0] == ghostLocation[0] && pacmanLocation[1] == ghostLocation[1]) {
    // Same Y cordinate and X
    return(true);
  }
}
function getPacmanLocation() {
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      if (map[i][t] == "p") {
        // p is pac man
        // Return pacman location as a array
        return([i, t]);
      }
    }
  }
}
function createPoints() {
  // This funciton creates
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      if (map[i][t] != 0 && map[i][t] != 'p') {
        // p is pac man
        // Return pacman location as a array
        console.log([i]+ "," + [t]);
        map[i][t] = 2;
        // 2 is a point
      }
    }
  }
}
function checkForPointAndGhostEating(direction) {
  // This function check if pacman has hit a score and than add it to the score
  // We check if there is a point before pacman has walked
  var PacmanLocation = getPacmanLocation();

  var PacmanLocationX = PacmanLocation[1];
  var PacmanLocationY = PacmanLocation[0];

  if (direction == "up") {
    if (map[PacmanLocationY - 1][PacmanLocationX] == 2 && map[PacmanLocationY - 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY - 1][PacmanLocationX] = 1;
      score++;
    }
    else if (map[PacmanLocationY - 1][PacmanLocationX] == 3 && map[PacmanLocationY - 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY - 1][PacmanLocationX] = 1;
      startGhostEating();
    }
  }
  else if (direction == "down") {
    if (map[PacmanLocationY + 1][PacmanLocationX] == 2 && map[PacmanLocationY + 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY + 1][PacmanLocationX] = 1;
      score++;
    }
    else if (map[PacmanLocationY + 1][PacmanLocationX] == 3 && map[PacmanLocationY - 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY + 1][PacmanLocationX] = 1;
      startGhostEating();
    }
  }
  else if (direction == "left") {
    if (map[PacmanLocationY][PacmanLocationX - 1] == 2 && map[PacmanLocationY][PacmanLocationX - 1] != "undefined") {
      map[PacmanLocationY][PacmanLocationX - 1] = 1;
      score++;
    }
    else if (map[PacmanLocationY][PacmanLocationX - 1] == 3 && map[PacmanLocationY - 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY][PacmanLocationX - 1] = 1;
      startGhostEating();
    }
  }
  else if (direction == "right") {
    if (map[PacmanLocationY][PacmanLocationX + 1] == 2 && map[PacmanLocationY][PacmanLocationX + 1] != "undefined") {
      map[PacmanLocationY][PacmanLocationX + 1] = 1;
      score++;
    }
    else if (map[PacmanLocationY][PacmanLocationX + 1] == 3 && map[PacmanLocationY - 1][PacmanLocationX] != "undefined") {
      map[PacmanLocationY][PacmanLocationX + 1] = 1;
      startGhostEating();
    }
  }
    displayPoints();

}
function createGhostEating() {
  // Create ghost eat candy
  map[1][4] = 3;
  map[6][6] = 3;
  map[8][5] = 3;
}
var ghostEatingInterval;
function startGhostEating() {
  ghostEatingInterval = setInterval(countdownGhostEating, 1000);
  timer = 20;
  ghostEatable = 1;
}
function endGhostEating() {
  clearInterval(ghostEatingInterval);
  ghostEatable = 0;
}
function checkGhostEating() {
  if (timer == 0) {
    endGhostEating();
    return(false);
  }
  else {
    return(true);

  }
}
function countdownGhostEating() {
  // This function counts down for how long pacman can eat a ghost
  if (timer == 0) {
    endGhostEating();
  }
  else {
    timer--;
  }
}
function getGhostLocation() {
  // Locate the ghost
  // And send it back as a array
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      if (map[i][t] == 4 || map[i][t] == 5) {

        return([i, t]);
        // y , x cordinates
      }
    }
  }
}
function moveGhostToPlayer() {
  // This function moves the ghost to pacman
  var ghostLocation = getGhostLocation();
  var pacmanLocation = getPacmanLocation();

  var ghostLocationX = ghostLocation[1];
  var ghostLocationY = ghostLocation[0];

  console.log("Pacman location "+ getPacmanLocation());

  if (ghostLocation[1] < pacmanLocation[1]) {
    console.log("right");
    // right
    if (checkForWall("right") == false) {
      if (checkIfPacmanDiesGhost("right") == false) {
        if (checkForPoint("right") == true) {
          // There is a point on the next block
          // So we display the ghost with a diffrent number so we can after replace the block
          // ghost = 5
          map[ghostLocationY][ghostLocationX + 1] = 5;
        }
        else {
          // No point so default placement ghost=4
          map[ghostLocationY][ghostLocationX + 1] = 4;
        }
      }
      else {
        // Pacman dies
        pacmanDies();
      }
    }
  }
  else if (ghostLocation[1] > pacmanLocation[1]) {
    // left
    console.log("left");
    console.log(checkForWall("left"));
    if (checkForWall("left") == false) {
      if (checkIfPacmanDiesGhost("left") == false) {
        if (checkForPoint("left") == true) {
          // There is a point on the next block
          // So we display the ghost with a diffrent number so we can after replace the block
          // ghost = 5
          console.log("true");
          map[ghostLocationY][ghostLocationX - 1] = 5;
        }
        else {
          // No point so default placement ghost=4
          map[ghostLocationY][ghostLocationX - 1] = 4;
        }
      }
      else {
        // Pacman dies
        pacmanDies();
      }
    }
  }
  else if (ghostLocation[0] > pacmanLocation[0]) {
    // UP
    console.log("up");
    if (checkForWall("up") == false) {
      if (checkIfPacmanDiesGhost("up") == false) {
        if (checkForPoint("up") == true) {
          // There is a point on the next block
          // So we display the ghost with a diffrent number so we can after replace the block
          // ghost = 5
          map[ghostLocationY - 1][ghostLocationX] = 5;
        }
        else {
          // No point so default placement ghost=4
          map[ghostLocationY - 1][ghostLocationX] = 4;
        }
      }
      else {
        // Pacman dies
        pacmanDies();
      }
    }
  }
  else if (ghostLocation[0] < pacmanLocation[0]) {
    // Down
    console.log("Down");
    if (checkForWall("down") == false) {
      if (checkIfPacmanDiesGhost("down") == false) {
        if (checkForPoint("down") == true) {
          // There is a point on the next block
          // So we display the ghost with a diffrent number so we can after replace the block
          // ghost = 5
          map[ghostLocationY + 1][ghostLocationX] = 5;
        }
        else {
          // No point so default placement ghost=4
          map[ghostLocationY + 1][ghostLocationX] = 4
        }
      }
      else {
        // Pacman dies
        pacmanDies();
      }
    }
  }
  map[ghostLocationY][ghostLocationX] = 1;
  if (checkIfPacmanDiesGhost("none") == true) {
    // If the ghost is on the same block as pacman
    pacmanDies();
  }
  renderPage();
}
function nextPostionGhost(direction) {
  // Get the next postion from the ghost
  // Direction contains the direction that the ghost is going
}
function checkForPoint(direction) {
  // This function checks if there is a point in the next blok
  var ghostLocation = getGhostLocation();

  var ghostLocationX = ghostLocation[1];
  var ghostLocationY = ghostLocation[0];

  if (direction == "up") {
    if (map[ghostLocationY - 1][ghostLocationX] == 2 && map[ghostLocationY - 1][ghostLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "down") {
    if (map[ghostLocationY + 1][ghostLocationX] == 2 && map[ghostLocationY + 1][ghostLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }

  }
  else if (direction == "left") {
    if (map[ghostLocationY][ghostLocationX - 1] == 2 && map[ghostLocationY][ghostLocationX - 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }

  }
  else if (direction == "right") {
    if (map[ghostLocationY][ghostLocationX + 1] == 2 && map[ghostLocationY][ghostLocationX + 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }

  }
}
function checkForWall(direction) {
  var ghostLocation = getGhostLocation();
  console.log(ghostLocation);

  var ghostLocationX = ghostLocation[1];
  var ghostLocationY = ghostLocation[0];

  if (direction == "up") {
    if (map[ghostLocationY - 1][ghostLocationX] == 0 && map[ghostLocationY - 1][ghostLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "down") {
    if (map[ghostLocationY + 1][ghostLocationX] == 0 && map[ghostLocationY + 1][ghostLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }

  }
  else if (direction == "left") {
    console.log(ghostLocationY);
    console.log(ghostLocationX + 1);
    if (map[ghostLocationY][ghostLocationX - 1] == 0 && map[ghostLocationY][ghostLocationX - 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }

  }
  else if (direction == "right") {
    if (map[ghostLocationY][ghostLocationX + 1] == 0 && map[ghostLocationY][ghostLocationX + 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }

  }
}
function displayPoints() {
  document.getElementById('score').innerHTML = "Score: " + score;
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
function clearMap() {
  // Empty's de map and gives it the deafult value 1
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      map[i][t] = 1;
    }
  }
}
function resetScore() {
  score = 0;
  displayPoints();
}
function resetGame() {
  // This function resets the game after pacman dies
  clearMap();

  createOutsideWall();
  createPacman();
  createGhostEating();

  createPoints();
  createGhost();

  deleteScore();

  renderPage();
}
function deleteScore() {
  score = 0;
  displayPoints();
}
function checkIfPacmanDiesGhost(direction) {
  // This function checks if the ghost and pacman are on the same platform
  // If it is it returns true
  // Thjis function is used for the ghost
  var pacmanLocation = getPacmanLocation();
  var ghostLocation = getGhostLocation();

  console.log("PACMAN DIES GHOST: " + getPacmanLocation());

  var ghostLocation = getGhostLocation();
  console.log(ghostLocation);

  var ghostLocationX = ghostLocation[1];
  var ghostLocationY = ghostLocation[0];

  if (direction == "up") {
    if (map[ghostLocationY - 1][ghostLocationX] == "p" && map[ghostLocationY - 1][ghostLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "down") {
    if (map[ghostLocationY + 1][ghostLocationX] == "p" && map[ghostLocationY + 1][ghostLocationX] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "left") {
    if (map[ghostLocationY][ghostLocationX - 1] == "p" && map[ghostLocationY][ghostLocationX - 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }
  else if (direction == "right") {
    if (map[ghostLocationY][ghostLocationX + 1] == "p" && map[ghostLocationY][ghostLocationX + 1] != "undefined") {
      return(true);
    }
    else {
      return(false);
    }
  }


  if (pacmanLocation[0] == ghostLocation[0] && pacmanLocation[1] == ghostLocation[1]) {
    // Same Y cordinate and X
    return(true);
  }
}
function pacmanDies() {
  // When pacman dies due to a Ghost
  alert("Pacman has died");
  if (lives == 0) {
    resetGame();
    alert("End game");
    // GAME RESETS
  }
  else {
    lives--;
    resetBoard();
    // Map resets
  }
  displayPacmanLives();
}
function resetBoard() {
  // This function reset the bord to it orginal shape
  // This is done when the pacman died and this has a live left

  clearMap();

  createOutsideWall();
  createPacman();
  createGhostEating();

  createPoints();
  createGhost();

  renderPage();
}
function displayPacmanLives() {
  document.getElementById('lives').innerHTML = "Lives: " + lives;
}
function renderPage() {
  // Renders the page by content of the map array
  for (var i = 0; i < map.length; i++) {
    for (var t = 0; t < map.length; t++) {
      var div = document.getElementById(i + "," + t);

      if (map[i][t] == 0) {
        div.className = "border";
      }
      else if (map[i][t] == "p") {
        div.className = "pacman"
      }
      else if (map[i][t] == 2) {
        div.className = "point";
      }
      else if (map[i][t] == 3) {
        div.className = "ghostPil";
      }
      else if (map[i][t] == 4) {
        div.className = "ghost";
      }
      else if (map[i][t] == 5) {
        div.className = "ghost";
        // GHOST + point
      }
      else {
        div.className = "walk";
      }

      if (t === 9) {
        // When it is nothing
      }
      else if (t != 9) {
        // When the vak isn't at the end of the map array
        // We don't use a float
        div.className += " bord_part";
      }
      div.className += " bord";
    }
  }
}
