// const dictionary = ["earth", "plane", "crane", "audio", "house"];
const dictionary=["fable","grace",	"happy"	,"ideal",	"jewel",
  "karma","laugh"	,"magic",	"noble",	"oasis",
  "peace"	,"quiet" , "roast"	,"smart"	,"toast",
  "unity",	"vital","xerox"	,'youth',
  "zebra"	,"abide"	,"bluff"	,"charm"	,"dwell",
  "aager",	"feast",	"gloom"	,"heart"	,"ivory",
  "jazzy",	"kudos",	"loyal"	,"mirth"	,"nymph",
  "ozone"	,"primp"	,"quirk"	,"shout"	,"tempo",
  "unique",	"verge",	"whisk",	"xylog",	"yacht",
  "zesty"	,"agent"	,"bliss"	,"chief"	,"defer",
  "exact"	,"fancy"	,"giddy"	,"hasty"	,'infer',
  "jolly",	"karma",	"latch"	,"merry"	,'nicer',
  "olive",	"plush",	"quell"	,"scout"	,"tweet",
  'union',	'vixen',	'wacky'	,'xenon',	"yummy",
  'zesty',	'adept',	'brave'	,'clear',	"dandy",
  'elite',	'fancy',	'gains'	,'hinge',	"inked",
  'jumpy',	'kinky',	'loved'	,'mixed',	'noble',
  'upset',	'vowed',	'waxed'	,'xerox',	"yearn",
  'zebra',	'abode',	'blend'	,'chase',	"debut",
  'ember',	'fancy',	'gleam'	,'hotel',	"indie",
  'joust',	'kudos',	'laced'	,'medal',	'nudge',
  'oiled',	'paced',	'quest'	,'shade'	,"torch",
  'unite',	'verve',	'wager'	,'xenon',	"zesty"]


const state = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")),
  currentRow: 0,
  currentCol: 0,
};

function drawBox(container, row, col, letter = "") {
  let box = document.createElement("div");
  box.className = "input";
  box.id = `input${row}${col}`;
  box.textContent = letter;
  container.appendChild(box);
  return box;
}

function drawGrid(container) {
  let grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawBox(grid, i, j);
    }
  }
  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`input${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function registerKeyEvents() {
  document.body.onkeydown = (event) => {
    const key = event.key;

    if (key === "Enter") {
      if (state.currentCol === 5) {
        const word = getCurrentWord();

        if (isWordValid(word)) {
          revealWord(word);
          state.currentRow++;
          state.currentCol = 0;
        } else {
          alert("Invalid word");
        }
      }
    }

    if (key === "Backspace") {
      // const row = state.currentRow;
      // const col = state.currentCol - 1;
      // const box = document.getElementById(`input${row}${col}`);
      // box.classList.remove("entered");
      removeLetter();
    }

    if (isLetter(key)) {
      // const row = state.currentRow;
      // const col = state.currentCol;
      // const box = document.getElementById(`input${row}${col}`);
      // box.classList.add("entered");
      addLetter(key);
    }
    updateGrid();
  };
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
  return dictionary.includes(word);
}

function revealWord(guess) {
  const row = state.currentRow;
  const animation_duration = 500;

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`input${row}${i}`);

    const letter = box.textContent;

    setTimeout(() => {
      if (letter === state.secret[i]) {
        box.classList.add("right");
      } else if (state.secret.includes(letter)) {
        box.classList.add("wrong");
      } else {
        box.classList.add("empty");
      }
    }, ((i + 1) * animation_duration) / 2);

    box.classList.add("animate");
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`;

    box.style.border = "none";
    box.style.color = "white";
  }

  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 5;

  setTimeout(() => {
    if (isWinner) {
      alert("You win");
    }
    if (isGameOver) {
      alert(`Game over ${state.secret}`);
    }
  }, 3 * animation_duration);
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 5) {
    return;
  }

  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) {
    return;
  }
  state.grid[state.currentRow][state.currentCol - 1] = "";
  state.currentCol--;
}

function startup() {
  const container = document.querySelector(".container");
  drawGrid(container);

  registerKeyEvents();
}

startup();
