class Vector {
    constructor(x = 0, y = 0) {
        this.x = x; 
        this.y = y;
    }
}

class Rectangle {
    constructor(width, height) {
        this.position = new Vector;
        this.size = new Vector(width, height)
    }
}

class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new Vector;
    }
}

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const ball = new Ball;
ball.position.x = 100;
ball.position.y = 50;

ball.velocity.x = 100;
ball.velocity.y = 100;

let lastTime;
function callback(millis) {
    if (lastTime) {
        update((millis - lastTime) / 1000);
    }

    lastTime = millis;
    requestAnimationFrame(callback);
}

function update(dt) { 
    ball.position.x += ball.velocity.x * dt;
    ball.position.y += ball.velocity.y * dt;

    if (ball.position.x < 0 || ball.position.x > canvas.width){
        ball.velocity.x = -ball.velocity.x;
    }

    if (ball.position.y < 0 || ball.position.y > canvas.height){
        ball.velocity.y = -ball.velocity.y;
    }

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#fff';
    context.fillRect(ball.position.x, ball.position.y, ball.size.x, ball.size.y);
}

callback();