let areas = document.querySelectorAll("[data-cell]")
let restart = document.querySelector(".restart")
let circleTurn;

restart.addEventListener('click',resetBoard);

function resetBoard() {
  areas.forEach(item => {
    if (item.classList.contains("o")) {
      item.classList.remove("o")
    } else {
      item.classList.remove("x");
    }
  })
  circleTurn = false;
  console.log("turn is:", circleTurn);
  playGame();
}




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

console.log(areas)


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
  }
  
}

//creates a player object with name and type (o or x)
function player(name,type) {
  return {
    name,
    type
  }
}

let x = player("Michael","o");
let y = player("Jordan", "x");
console.log(x);


function checkWin(currentClass) {
  return winningMoves.some(combination => {
    return combination.every(index => {
      return areas[index].classList.contains(currentClass);
    })
  })
}

