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
    get left(){
        return this.position.x - this.size.x / 2;
    }
    get right(){
        return this.position.x - this.size.x / 2;
    }
    get top(){
        return this.position.y - this.size.y / 2;
    }
    get bottom(){
        return this.position.y - this.size.y / 2;
    }
}

class Ball extends Rectangle {
    constructor() {
        super(10, 10);
        this.velocity = new Vector;
    }
}

class Player extends Rectangle {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

class Pong {
    constructor(canvas){
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this.ball = new Ball;
        this.ball.position.x = 100;
        this.ball.position.y = 50;

        this.ball.velocity.x = 100;
        this.ball.velocity.y = 100;
    
        this.players = [
            new Player, 
            new Player,
        ]

        this.players[0].position.x = 40;
        this.players[1].position.x = this._canvas.width - 40;
        this.players.forEach(player => {
            player.position.y = this._canvas.height / 2; 
        })
        let lastTime;
        const callback = (millis) => {
            if (lastTime) {
                 this.update((millis - lastTime) / 1000);
                }
            lastTime = millis;
            requestAnimationFrame(callback);
        };

         callback();
        }
    draw(){
        this._context.fillStyle = '#191970';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.drawRect(this.ball);
        this.players.forEach(player => this.drawRect(player));
        }

    drawRect(rect){
        this._context.fillStyle = '#AFEEEE';
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
        }


        update(dt) { 
        this.ball.position.x += this.ball.velocity.x * dt;
        this.ball.position.y += this.ball.velocity.y * dt;
    
        if (this.ball.left < 0 || this.ball.right > this._canvas.width){
            this.ball.velocity.x = -this.ball.velocity.x;
        }
    
        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height){
            this.ball.velocity.y = -this.ball.velocity.y;
        }
            this.draw();
        }
}

const canvas = document.getElementById('pong');

const pong = new Pong(canvas);