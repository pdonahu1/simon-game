let order = [];         // keep track of the order of the lights
let playerOrder = [];   // keeps track of the order that the player selects
let flash;              // integer, the number of flashes that appear in the game
let turn;               // keep track of what turn the player is on
let good;               // a boolean true or false
let compTurn;           // a boolean true or false - keeps track of whether it's the computers turn, or the players turn
let intervalId;         
let strict = false;     // keep track of whether the 'strict' box is checked
let noise = true;       // set true for audio effects to work
let on = false;         // game will be 'off' at the start
let win;                // whether the player has won the game or not

// create the variables for all of the elements to reference
const turnCounter = document.querySelector('#turn');    // pass in element with the id="turn", which is the counter display
const topLeft = document.querySelector('#topleft');     // pass in the elements of the quadrents
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

// begin writting the code - in the order you would play the game:
// strict button, pass in an anomyous function
strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = '-';    // turn on the little dash on the counter display
    } else {
        on = false;
        turnCounter.innerHTML = '';     // turn OFF the little dash on the counter display
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) {                    // if On is 'true', or Win is 'true' - call the play function
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;      // set for the first round of the game
    good = true;

    for (var i = 0; i < 20; i++) {  // random set, 20 rounds to win the game
        order.push(Math.floor(Math.random() * 4) + 1);  // console.log(order); power + start button - to see the array on numbers of 1 - 4
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);  // set interval time to 800 milliseconds
  }

  function gameTurn() {
    on = false;

      if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
      }
      if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();

            flash++                             // increment the flash sequence
        }, 200);                                
      }
  }

  function one() {
    if (noise) {
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = 'lightgreen';
  }


  function two() {
    if (noise) {
        let audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = 'tomato';
  }


  function three() {
    if (noise) {
        let audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = 'yellow';
  }


  function four() {
    if (noise) {
        let audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = 'lightskyblue';
  }

  function clearColor() {
    topLeft.style.backgroundColor = 'darkgreen';
    topRight.style.backgroundColor = 'darkred';
    bottomLeft.style.backgroundColor = 'goldenrod';
    bottomRight.style.backgroundColor = 'darkblue';
  }

  function flashColor() {
    topLeft.style.backgroundColor = 'lightgreen';
    topRight.style.backgroundColor = 'tomato';
    bottomLeft.style.backgroundColor = 'yellow';
    bottomRight.style.backgroundColor = 'lightskyblue';
  }

  topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);        // 
        check();
        one();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
  });


  topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);        // 
        check();
        two();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
  });


  bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);        // 
        check();
        three();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
  });


  bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);        // 
        check();
        four();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
  });

  function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) 
    good = false; 

    if (playerOrder.length == 6 && good) {
        winGame();
    }
    if (good == false) {
        turnCounter.innerHTML = 'NO!';
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
                noise = false;
    }
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
  }
function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
    }
