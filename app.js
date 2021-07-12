let areas = document.querySelectorAll("[data-cell]")
let restart = document.querySelector(".restart")
let p1Name = document.querySelector("#p1").value;
let p2Name = document.querySelector("#p2").value;
let p1Wins = document.querySelector("#p1Score");
let p2Wins = document.querySelector("#p2Score");
let msg = document.querySelector(".message");
let circleTurn;

const winningMoves = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

//Updates player names whenever changed through oninput attribute
function updateName() {
  p1Name = document.querySelector("#p1").value;
  p2Name = document.querySelector("#p2").value;
  p1.name = p1Name;
  p2.name = p2Name;
}

restart.addEventListener('click',resetBoard);

//removes all x's and o's when restart button pressed
//sets circleTurn to false so first move is always x
//clears the current message
//finally call playGame function to restart all areas
function resetBoard() {
  areas.forEach(item => {
    if (item.classList.contains("o")) {
      item.classList.remove("o")
    } else {
      item.classList.remove("x");
    }
  })
  circleTurn = false;
  msg.innerHTML = "";
  playGame();
}

//Sets up initial player names and game
let p1 = player(p1Name,"x");
let p2 = player(p2Name,"o");
playGame();

function playGame() {
  areas.forEach(item => {
    item.addEventListener('click', clicked, {once: true})
    //item.addEventListener('click', clicked)
  })
}

function clicked(e) {
  console.log(e.target);
  const currentClass = circleTurn ? "o" : "x"
  console.log(currentClass)

  if (currentClass == "x") {
    this.classList.add("x");
    circleTurn = true;
  }

  if (currentClass == "o") {
    this.classList.add("o");
    circleTurn = false;
  }

  if (checkWin(currentClass)) {
    console.log("winner");
    if (currentClass == "o") {
      p2.wins++
      p2Wins.innerHTML = `Wins: ${p2.wins}`
      msg.innerHTML = `${p2Name} won!`
    } else if (currentClass == "x") {
      p1.wins++
      p1Wins.innerHTML = `Wins: ${p1.wins}`
      msg.innerHTML = `${p1Name} won!`
    } 
  } else if (isTied()) {
    msg.innerHTML = 'tied!'
  }
  
}

//Need to de-structure nodelist to array
//.every returns true or false if some condition is met
//condition is whether every area contains either x or o in the classList
function isTied() {
  return [...areas].every(index => index.classList.contains('x') || index.classList.contains('o'))
}



function checkWin(currentClass) {
  return winningMoves.some(combination => {
    return combination.every(index => {
      return areas[index].classList.contains(currentClass);
    })
  })
}

function player(name,type) {
  return {
    name: name,
    type: type,
    wins:0
  }
}
