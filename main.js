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
