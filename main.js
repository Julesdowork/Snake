const gameArea = document.querySelector("#game");
const ctx = gameArea.getContext("2d");
const startBtn = document.querySelector("button");
const lengthText = document.querySelector("#length")
const squareSize = 20;
const width = 960;
const height = 600;
const xIntervals = 46;  // 960 / 20 - 2 for padding
const yIntervals = 28;  // 600 / 20 - 2 for padding

let length;
let direction;
let snake;
let mice;
let isRunning;

const setupGame = function() {
  snake = [{x:0, y:0}];
  direction = "";
  length = 1;
  createMice();
  updateLengthText();
  startBtn.addEventListener("click", startGame);
  paint();
}

const startGame = function() {
  this.setAttribute("disabled", true);
  document.addEventListener("keydown", handleInput);
  runGame = setInterval(paint, 80);
}

function handleInput() {
  let key = window.event.key;
  isRunning = true;

  switch(key) {
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    default: break;
  }
}

const drawSnakeBody = (x, y) => {
  ctx.fillStyle = "#CCCB69";
  ctx.strokeStyle = "#888745";
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
  ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

const collidedWithWalls = (x, y) => {
  if (x <= -1 || x >= width / squareSize || y <= -1 || y >= height / squareSize)
    return true;
  return false;
}

const collidedWithSelf = (x, y) => {
  if (isRunning) {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) {
        return true;
      }
    };
  }
  return false;
}

const collidedWithMice = (x, y) => {
  return x === mice.x && y === mice.y;
}

const createMice = () => {
  mice = {
    x: Math.floor((Math.random() * xIntervals) + 1),
    y: Math.floor((Math.random() * yIntervals) + 1)
  }

  snake.forEach((node) => {
    let snakeX = node.x;
    let snakeY = node.y;

    if (mice.x === snakeX || mice.y === snakeY || mice.x === snakeX && mice.y === snakeY) {
      mice.x = Math.floor((Math.random() * xIntervals) + 1);
      mice.y = Math.floor((Math.random() * yIntervals) + 1);
    }
  });
}

const drawMice = (x, y) => {
  ctx.fillStyle = "#FF6362";
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
  ctx.strokeStyle = "#8d3333";
  ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

const updateLengthText = () => {
  lengthText.innerText = length;
}

const paint = () => {
  ctx.fillStyle = '#5C90B2';
  ctx.fillRect(0, 0, width, height);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right") {
    snakeX++;
  } else if (direction === "left") {
    snakeX--;
  } else if (direction === "up") {
    snakeY--;
  } else if (direction === "down") {
    snakeY++;
  }

  if (collidedWithWalls(snakeX, snakeY) || collidedWithSelf(snakeX, snakeY)) {
    isRunning = false;
    startBtn.removeAttribute("disabled");
    clearInterval(runGame);
    document.removeEventListener("keydown", handleInput);
    setupGame();
    return;
  }

  let tail;
  if (collidedWithMice(snakeX, snakeY)) {
    tail = {
      x: snakeX,
      y: snakeY
    };
    length++;
    updateLengthText();
    createMice();
  } else {
    tail = snake.pop();
    tail.x = snakeX;
    tail.y = snakeY;
  }

  snake.unshift(tail);

  snake.forEach(node => {
    drawSnakeBody(node.x, node.y);
  });

  drawMice(mice.x, mice.y);
}

window.document.onload = setupGame();