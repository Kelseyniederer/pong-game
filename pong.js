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

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

context.fillStyle = '#fff';
context.fillRect(ball.position.x, ball.position.y, ball.size.x, ball.size.y);