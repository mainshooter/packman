var map;
// 2 dimentional array

var game;
// game object

var pacman;
// Pacman object

var ghost;

var score = 0;


// Events listners
(function() {
  pacman = {
    create: function() {
      map[5][4] = "p";
    },
    locate: function() {
      // Locates pacman by the map array
      for (var i = 0; i < map.length; i++) {
        for (var t = 0; t < map.length; t++) {
          if (map[i][t] == 'p') {

            return([i, t]);
            // y , x cordinates
          }
        }
      }
    },
    nextDirection: function(direction) {
      // This function calculates the next postion with direction
      var PacmanLocation = pacman.locate();
      var PacmanLocationX = PacmanLocation[1];
      var PacmanLocationY = PacmanLocation[0];

      var nextdirection;

      if (direction == "up") {
          nextdirection = [PacmanLocationY - 1,PacmanLocationX];
      }
      else if (direction == "down") {
        nextdirection = [PacmanLocationY + 1, PacmanLocationX];
      }
      else if (direction == "left") {
        nextdirection = [PacmanLocationY, PacmanLocationX - 1];
      }
      else if (direction == "right") {
        nextdirection = [PacmanLocationY, PacmanLocationX + 1];
      }
      return(nextdirection);
    },
    move: function(event) {
      // Moves pacman
      var direction = game.detectKey(event);
      // Get the current direction

      var pacmanLocation = pacman.locate();

      var nextCordinates = pacman.nextDirection(direction);
      // Get the next cordinates

      if (game.detectBorder(nextCordinates[1], nextCordinates[0]) == false) {
        pacman.removePrevious();
        // Removes the previous pacman

        if (game.detectScore(nextCordinates[0], nextCordinates[1]) == true) {
          // Checks for score
          game.addScore();
          // Adds a score
          game.displayPoints();
          // Displayes the score

          // Score on the bord will automaticly be removed when pacman is placed
        }
        map[nextCordinates[0]][nextCordinates[1]] = 'p';
        // Set pacman to his new location
      }
      game.renderMap();
    },
    removePrevious: function() {
      // This function removes pacman from the block where it first stant on
      var PacmanLocation = pacman.locate();
      var PacmanLocationX = PacmanLocation[1];
      var PacmanLocationY = PacmanLocation[0];

      map[PacmanLocationY][PacmanLocationX] = 1;
    }
  }
})();

(function() {
  ghost = {
    create: function() {
      // Loads the map
      map[3][8] = 4;
    },
    locate: function() {
      for (var i = 0; i < map.length; i++) {
        for (var t = 0; t < map.length; t++) {
          if (map[i][t] == 4 || map[i][t] == 5) {

            return([i, t]);
            // y , x cordinates
          }
        }
      }
    },
    move: function() {
      // Handels the movement of the ghost
      var nextCordinates = ghost.nextLocation();
      console.log(nextCordinates);

      if (game.detectBorder(nextCordinates[1], nextCordinates[0]) == false) {
        // If the computer doen't hit a border
        if (game.detectScore(nextCordinates[1], nextCordinates[0]) == false) {
          // No score on postion we place a normal ghost 4
          ghost.replacePreviousLocation();
          map[nextCordinates[0]][nextCordinates[1]] = 4;
        }
        else {
          // Place contains a score
          // Place ghost 5
          // After the ghost leaves the block
          // The score returns
          ghost.replacePreviousLocation();
          map[nextCordinates[0]][nextCordinates[1]] = 5;
        }
      }
      game.renderMap();
    },
    replacePreviousLocation: function() {
      // This function replaces the old position that the ghost was on
      // If it was a 5 we replace it with a point(2)
      // If it is a 4 we replace it wit 1
      var ghostLocation = ghost.locate();

      if (map[ghostLocation[0]][ghostLocation[1]] == 5) {
        map[ghostLocation[0]][ghostLocation[1]] = 2;
      }
      else if (map[ghostLocation[0]][ghostLocation[1]] == 3) {
        map[ghostLocation[0]][ghostLocation[1]] = 1;
      }
      else {
        map[ghostLocation[0]][ghostLocation[1]] = 1;
      }
    },
    nextLocation: function() {
      // Calculate the next direction based on the location of pacman

      var pacmanLocation = pacman.locate();

      var ghostLocation = ghost.locate();
      var ghostLocationX = ghostLocation[1];
      var ghostLocationY = ghostLocation[0];

      var nextdirection;

      if (ghostLocation[1] < pacmanLocation[1]) {
        // right
        nextdirection = [ghostLocationY, ghostLocationX + 1];
      }
      else if (ghostLocation[1] > pacmanLocation[1]) {
        // left
        nextdirection = [ghostLocationY, ghostLocationX - 1];
      }
      else if (ghostLocation[0] > pacmanLocation[0]) {
        // up
        nextdirection = [ghostLocationY - 1,ghostLocationX];
      }
      else if (ghostLocation[0] < pacmanLocation[0]) {
        // down
        nextdirection = [ghostLocationY + 1, ghostLocationX];
      }
      return(nextdirection);
    }
  }
})();

(function() {
  game = {
      detectBorder: function(x, y) {
        // Detects the border
        // By the next direction
            if (map[x][y] == 0) {
              return(true);
              // Detects the border
              // When it does it returns true
            }
            else {
              return(false);
        }
      },
      detectScore: function(x, y) {
        // Detects if a score if hit
        // Returns true when it does
        if (map[x][y] == 2) {
          return(true);
        }
        else {
          return(false);
        }
      },
      deleteScorePosition: function(x, y) {
        // This function deletes the score on the map
        // After the score is added
        map[x][y] = 1;
      },
      createMap: function() {
        // Create the map when it loads for the first time

        // This is a anominouse function
        // You can call the function by the following
        // game.Createmap();
        map = new Array(10);
        for (var i = 0; i < 10; i++) {
          map[i] = new Array(10);
        }
        var div;
        // Creates the HTML elements
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
      },
      renderMap: function() {
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
              // Is a pill wich if it is been eaten pacman can eat a ghost
              div.className = "ghostPil";
            }
            else if (map[i][t] == 4) {
              // Ghosts wich before the ghost stand on the block didn't contain a point
              div.className = "ghost";
            }
            else if (map[i][t] == 5) {
              // Ghosts wich before the ghost stand on the block is containing a point
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
      },
      createBorder: function() {
        console.log("RUN");
        for (var i = 0; i < 9; i++) {
          map[0][i] = 0;
          // Creates the top border
        }
        for (var i = 0; i < 9; i++) {
          map[9][i] = 0;
          // Create the bottom border
        }
        for (var i = 0; i < 9; i++) {
          map[i][9] = 0;
          // Create right border
        }
        for (var i = 0; i < 9; i++) {
          map[i][0] = 0;
          // Create left
        }
        // Wall is 0
        // Walkable path is 1
        // Points ball is 2
        // pacman is p

        map[9][9] = 0;
      },
      createPoints: function() {
        // Create the points that pacman can eat
        for (var i = 0; i < map.length; i++) {
          for (var t = 0; t < map.length; t++) {
            if (map[i][t] != 0 && map[i][t] != 'p' && map[i][t] != 3 && map[i][t] != 4 && map[i][t] != 5) {
              // Only on the thing that aren't pacman and aren't ghosts ore ghost points
              map[i][t] = 2;
              // 2 is a point
            }
          }
        }
      },
      clearMap: function() {
        for (var i = 0; i < map.length; i++) {
          for (var t = 0; t < map.length; t++) {
            map[i][t] = 1;
          }
        }
      },
      createGhostCandy: function() {
        // This function creates the candy that pacman can eat a ghost
        map[1][4] = 3;
        map[6][6] = 3;
        map[8][5] = 3;
      },
      resetMap: function() {
        // This function resets the map when pacman dies
        game.clearMap();

        game.createMap();
        game.createBorder();
        game.createPoints();
        game.createGhostCandy();

        pacman.create();
        ghost.create();

        game.renderMap();
      },
      startMap: function() {
        // This function starts the game
        game.createMap();
        game.createBorder();
        game.createPoints();
        game.createGhostCandy();

        pacman.create();
        ghost.create();

        game.renderMap();
      },
      displayPoints: function() {
        document.getElementById('score').innerHTML = "Score: " + score;
      },
      addScore: function() {
        // Adds a score when pacman eats a point
        score++;
      },
      detectKey: function(keycode) {
        // Detects a key press
        // Returns the translated keypress
        var keytranslate;
        keycode = keycode.keyCode;
        switch (keycode) {
          case 119:
          // a
            keytranslate = 'up';
            break;
          case 87:
          // A
            keytranslate = 'up';
            break;
          case 115:
          //s
            keytranslate = 'down';
            break;
          case 68:
            // S
            keytranslate = 'down';
            break;
          case 97:
            // a
            keytranslate = 'left';
            break;
          case 65:
            // A
            keytranslate = 'left';
            break;
          case 100:
            // d
            keytranslate = 'right';
            break;
          case 68:
            // D
            keytranslate = 'right';
            break;
        }
        return(keytranslate);
      }
  }
})();
game.startMap();
document.addEventListener("keypress", pacman.move);
