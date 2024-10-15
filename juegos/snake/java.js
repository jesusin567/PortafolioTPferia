const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = '';
let food = { x: Math.floor(Math.random() * 30) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;

document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

function collision(head, array) {
    return array.some(segment => head.x === segment.x && head.y === segment.y);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja la serpiente
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4CAF50" : "#A5D6A7";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Dibuja la comida
    ctx.fillStyle = "#FF5722";
    ctx.fillRect(food.x, food.y, box, box);

    // Nueva posición de la cabeza
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Comprobar si la serpiente come
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = `Puntos: ${score}`;
        food = { x: Math.floor(Math.random() * 30) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    // Comprobar colisiones
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        alert(`¡Perdiste! Comiste: ${score} alimentos.`);
        clearInterval(game);
        return;
    }

    snake.unshift(newHead);
}

// Inicializa el juego
const game = setInterval(draw, 100);
