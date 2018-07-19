const gameArea = document.querySelector("#game");
const ctx = gameArea.getContext("2d");
const squareSize = 20;
const width = 960;
const height = 600;
const xIntervals = 46;  // 960 / 20 - 2 for padding
const yIntervals = 28;  // 600 / 20 - 2 for padding
let length = 1;
let snake = [{x:0, y:0}];
let mice;

// console.log(ctx);

const drawSnakeBody = (x, y) => {
  ctx.fillStyle = "#CCCB69";
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

const drawMice = (x, y) => {
  ctx.fillStyle = "#FF6362";
  ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
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

const paint = () => {
  ctx.fillStyle = '#5C90B2';
  ctx.fillRect(0, 0, width, height);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  snake.forEach(node => {
    drawSnakeBody(node.x, node.y);
  });

  createMice();
  console.log(`(${mice.x},${mice.y})`);
  drawMice(mice.x, mice.y);
}

const startBtn = document.querySelector("button");
startBtn.addEventListener("click", function() {
  console.log("Game started");
  this.setAttribute("disabled", true);
});

paint();