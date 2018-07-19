let game = document.querySelector("html");
game.addEventListener("keydown", changeDirection);

let snakeHead = document.querySelector("#snake");
console.log(snakeHead);

let snake = {
  direction: "not moving",
  head: {
    top: 0,
    left: 0
  }
}

let snakeSize = 20;


document.querySelector("button").addEventListener("click", startGame);

function startGame()
{
  console.log("Game started");
  document.querySelector("#instructions").style.display = "none";
}

function changeDirection(event)
{
  let keyCode = event.key;
  switch (keyCode)
  {
    case "ArrowRight": snake.direction = "right";
      break;
    case "ArrowLeft": snake.direction = "left";
      break;
    case "ArrowUp": snake.direction = "up";
      break;
    case "ArrowDown": snake.direction = "down";
      break;
    default: break;
  }
  move(snake.direction);
}

function move(direction) {
  if (direction === "right") {
    snake.head.left += 25;
    snakeHead.style.left = snake.head.left + "px";
    console.log(snakeHead.style.left);
  } else {
    console.log("nothing");
  }
}