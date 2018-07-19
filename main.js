const gameArea = document.querySelector("#game");
const startBtn = document.querySelector("button");
const ctx = gameArea.getContext("2d");
const squareSize = 20;
const width = 960;
const height = 600;
const xIntervals = 46;  // 960 / 20 - 2 for padding
const yIntervals = 28;  // 600 / 20 - 2 for padding

let length = 1;
let direction;
let snake = [{x:0, y:0}];
let mice;

startBtn.addEventListener("click", function() {
  this.setAttribute("disabled", true);
  startGame();
});

document.onkeydown = event => {
  let key = event.key;
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

const setupGame = function() {
  createMice();
  paint();
}

const startGame = function() {
  runGame = setInterval(paint, 80);
}

const drawSnakeBody = (x, y) => {
  ctx.fillStyle = "#CCCB69";
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

const collidedWithWalls = (x, y) => {
  if (x <= -1 || x >= width / squareSize || y <= -1 || y >= height / squareSize)
    return true;
  return false;
}

const collidedWithSelf = (x, y, snake) => {
  snake.forEach(node => {
    if (node.x === x && node.y === y) {
      return true;
    }
  });
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
}

const lengthText = () => {
  let text = "Length: " + length;
}

const paint = () => {
  ctx.fillStyle = '#5C90B2';
  ctx.fillRect(0, 0, width, height);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "right") {
    snakeX++;
    // console.log(`(${snakeX},${snakeY})`);
  } else if (direction === "left") {
    snakeX--;
    // console.log(`(${snakeX},${snakeY})`);
  } else if (direction === "up") {
    snakeY--;
    // console.log(`(${snakeX},${snakeY})`);
  } else if (direction === "down") {
    snakeY++;
    // console.log(`(${snakeX},${snakeY})`);
  }

  if (collidedWithWalls(snakeX, snakeY) || collidedWithSelf(snakeX, snakeY, snake)) {
    startBtn.removeAttribute("disabled");
    ctx.clearRect(0, 0, width, height);
    clearInterval(runGame);
    return;
  }

  let tail;
  if (collidedWithMice(snakeX, snakeY)) {
    tail = {
      x: snakeX,
      y: snakeY
    };
    length++;
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

  lengthText();
}

setupGame();