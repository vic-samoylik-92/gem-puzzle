// ======= Create Wrapper =======
const body = document.querySelector("body");
const wrapper = document.createElement("div");
wrapper.className = "wrapper";
body.append(wrapper);

// ======= Create Controls Section =======
const controls = document.createElement("div");
controls.className = "controls";
wrapper.append(controls);

// ======= Buttons for Control Section =======
for (let i = 0; i < 4; i++) {
  const button = document.createElement("button");
  button.className = "controls__button";
  switch (i) {
    case 0:
      button.innerHTML = "Shuffle and Start";
      button.id = "shuffle-start";
      break;
    case 1:
      button.innerHTML = "Save";
      button.id = "save";
      break;
    case 2:
      button.innerHTML = "Results";
      button.id = "results";
      break;
    case 3:
      button.innerHTML = '<img src="./sound-on-icon.svg" />';
      button.id = "sound";
      break;
  }
  controls.append(button);
}

// ======= Create Info Section =======
const info = document.createElement("div");
info.className = "info";
wrapper.append(info);

// ======= Fill-in Info Section =======
const movesHeader = document.createElement("h3");
movesHeader.innerText = "Moves:";
const movesHolder = document.createElement("p");
movesHolder.id = "count-moves";

const timeHeader = document.createElement("h3");
timeHeader.innerText = "Time:";
const timeHolder = document.createElement("p");
timeHolder.innerText = "10:56";
timeHolder.id = "count-time";

info.append(movesHeader, movesHolder, timeHeader, timeHolder);

// ======= Create Board Section =======
const boardSection = document.createElement("div");
boardSection.className = "board";
wrapper.append(boardSection);

// ======= Create Board Itself =======
const board = document.createElement("div");
board.className = "board__grid";
boardSection.append(board);

// ======= Create Board Info =======
const boardInfo = document.createElement("div");
boardInfo.className = "board__info";
boardSection.append(boardInfo);

// ======= Fill-In Board Info =======
const boardSizes = document.createElement("div");
boardSizes.className = "board__sizes";
boardInfo.append(boardSizes);

const boardSizeCurrent = document.createElement("div");
boardSizeCurrent.className = "board__size-current";
boardSizes.append(boardSizeCurrent);

const boardSizeCurrentHeading = document.createElement("h3");
boardSizeCurrentHeading.innerText = "Frame Size:";
const boardSizeCurrentText = document.createElement("p");
boardSizeCurrentText.id = "current-size";
boardSizeCurrentText.innerText = "4x4";
boardSizeCurrent.append(boardSizeCurrentHeading, boardSizeCurrentText);

const boardSizeChoose = document.createElement("div");
boardSizeChoose.className = "board__size-choose";
boardSizes.append(boardSizeChoose);

const boardSizeChooseHeading = document.createElement("h3");
boardSizeChooseHeading.innerText = "Other sizes:";

const boardSizeButtons = document.createElement("div");
boardSizeButtons.className = "board__size-btns";
boardSizeChoose.append(boardSizeChooseHeading, boardSizeButtons);

for (let i = 0; i < 6; i++) {
  const button = document.createElement("button");
  button.className = "board__size-btn";
  button.innerText = `${i + 3}x${i + 3}`;
  button.id = `${i + 3}x${i + 3}`;
  boardSizeButtons.append(button);
}

// ======= Create Win Popup =======
const winPopup = document.createElement("div");
winPopup.className = "win-popup";
body.append(winPopup);

const winPopupWrapper = document.createElement("div");
winPopupWrapper.className = "win-popup__wrapper";
winPopup.append(winPopupWrapper);

const winPopupBody = document.createElement("div");
winPopupBody.className = "win-popup__body";
winPopupWrapper.append(winPopupBody);

const winPopupHeading = document.createElement("h4");
winPopupHeading.id = "win-congrats";
winPopupHeading.innerText =
  "Hooray! You solved the puzzle in ##:## and N moves!";

const winPopupCross = document.createElement("img");
winPopupCross.className = "win-popup__cross";
const crossSrc = "./cross.svg";
winPopupCross.src = crossSrc;

winPopupBody.append(winPopupHeading, winPopupCross);

// ======= Initial Settings =======
let isSolved = false;
let boardRows = 4;
let squareSize = 80;
let empty = {};
let squares = [];
let results = [];
let sec = 0;
let min = 0;
let movesCounter = 0;
let isTimeRunning = false;
let hasSound = true;

// ======= Create Save Popup =======
const savePopup = document.createElement("div");
savePopup.className = "save";
body.append(savePopup);

const saveWrapper = document.createElement("div");
saveWrapper.className = "save__wrapper";
savePopup.append(saveWrapper);

const saveWrapperText = document.createElement("h4");
saveWrapperText.innerHTML = "Saved...<br><br>You Can Reboot Page Safely";
saveWrapper.append(saveWrapperText);

const saveWrapperTextSmall = document.createElement("p");
saveWrapperTextSmall.innerText = "the functinality isn't implemented yet";
saveWrapper.append(saveWrapperTextSmall);

// ======= Create Results Popup =======
const resultsPopup = document.createElement("div");
resultsPopup.className = "results-popup";
body.append(resultsPopup);

const resultsPopupWrapper = document.createElement("div");
resultsPopupWrapper.className = "results-popup__wrapper";
resultsPopup.append(resultsPopupWrapper);

const resultsPopupBody = document.createElement("div");
resultsPopupBody.className = "results-popup__body";
resultsPopupWrapper.append(resultsPopupBody);

const resultsPopupInfo = document.createElement("div");
resultsPopupInfo.className = "results-popup__info";
resultsPopupInfo.innerHTML =
  results.length === 0
    ? `<h4>Seems There are<br>No Any Saved Results...</h4><p>the functinality isn't implemented yet</p>`
    : "Results.";

const resultsPopupCross = document.createElement("img");
resultsPopupCross.classList = "results-popup__cross";
resultsPopupCross.src = crossSrc;

resultsPopupBody.append(resultsPopupInfo, resultsPopupCross);

// ======= Track Moves =======
movesHolder.innerText = movesCounter;

function trackMoves() {
  movesCounter++;
  movesHolder.innerText = movesCounter;
}

// ======= Simple Stopwatch =======
const stopwatch = document.getElementById("count-time");
stopwatch.innerText = `0${min}:0${sec}`;

function ticking() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
  }
}

function renderStopwatch() {
  ticking();
  stopwatch.innerText =
    (min < 10 ? "0" + min + ":" : min + ":") + (sec < 10 ? "0" + sec : sec);
}

function clock() {
  timer = setInterval(renderStopwatch, 1000);
}

// ======= Move Function =======
function move(index, empty) {
  const square = squares[index];

  const leftDifference = Math.abs(empty.left - square.left);
  const TopDifference = Math.abs(empty.top - square.top);

  if (leftDifference + TopDifference > 1) {
    return;
  }

  if (!isTimeRunning) {
    sec = 0;
    min = 0;
    clock();
    isTimeRunning = true;
  }

  square.element.style.left = `${empty.left * squareSize}px`;
  square.element.style.top = `${empty.top * squareSize}px`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = square.left;
  empty.top = square.top;
  square.left = emptyLeft;
  square.top = emptyTop;

  trackMoves();

  if (hasSound) {
    makeNoise();
  }

  let solvedReference = [...Array(boardRows * boardRows).keys()].map(
    (item) => item + 1,
  );
  let boardItemsArray = Array.from(document.querySelectorAll(".board__item"));
  isSolved = boardItemsArray.every((item, index) => {
    return Number(item.innerText) === solvedReference[index];
  });

  console.log(isSolved);

  if (isSolved) {
    const fullTime =
      (min < 10 ? "0" + min + ":" : min + ":") + (sec < 10 ? "0" + sec : sec);
    winPopupHeading.innerText = `Hooray! You solved the puzzle in ${fullTime} and ${movesCounter} moves!`;
    winPopup.style.transform = "scale(1)";
    winPopup.style.opacity = "1";
  }
}

// ======= Make Sound Function =======
const soundButton = document.getElementById("sound");
soundButton.addEventListener("click", () => {
  if (hasSound) {
    hasSound = false;
    soundButton.innerHTML = `<img src="./sound-off-icon.svg" />`;
    soundButton.style.textDecoration = "line-through";
    soundButton.style.backgroundColor = "#a82c2c";
    soundButton.style.boxShadow = "0 2px 3px #813030";
  } else {
    hasSound = true;
    soundButton.innerHTML = '<img src="./sound-on-icon.svg" />';
    soundButton.style.textDecoration = "none";
    soundButton.style.backgroundColor = "#3c6b6d";
    soundButton.style.boxShadow = "0 2px 3px #243b3b";
  }
});

function makeNoise() {
  const audio = new Audio("./click.mp3");
  audio.play();
}

// ======= Rendering the Board =======
function renderBoard(size, columns, width = 80) {
  squares = [];
  // Generate Random Numbers
  const numbers = [...Array(size + 1).keys()]
    .map((item) => item + 1)
    .sort((item) => Math.random() - 0.5);

  // Generate Board Itself
  for (let i = 0; i < size + 1; i++) {
    const boardItem = document.createElement("div");
    boardItem.className = "board__item";
    boardItem.id = `${numbers[i]}`;
    let value = numbers[i];
    boardItem.innerText = value;

    let left = i % columns;
    let top = (i - left) / columns;

    boardItem.style.width = `${width}px`;
    boardItem.style.height = `${width}px`;

    if (value === size + 1) {
      empty = {
        value: size + 1,
        top: top,
        left: left,
        element: boardItem,
      };
      squares.push(empty);
      boardItem.id = "empty-square";
    } else {
      squares.push({
        value: value,
        left: left,
        top: top,
        element: boardItem,
      });
    }

    boardItem.style.left = `${left * width}px`;
    boardItem.style.top = `${top * width}px`;

    board.append(boardItem);
  }
}

// ======= Adding Event Listener to Every New Board Item =======
function makeBoardItemsRun() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].element.addEventListener("click", () => {
      move(i, empty);
    });
  }
}
