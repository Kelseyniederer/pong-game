class Vector {
    constructor(x = 0, y = 0) {
        this.x = x; 
        this.y = y;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set length(value) {
        const factor = value / this.length;
        this.x *= factor;
        this.y *= factor;
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
        return this.position.x + this.size.x / 2;
    }
    get top(){
        return this.position.y - this.size.y / 2;
    }
    get bottom(){
        return this.position.y + this.size.y / 2;
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

         this.CHAR_PIXEL = 10;
         this.CHARS =[
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111',
         ].map(string => {
             const canvas = document.createElement('canvas');
             canvas.height = this.CHAR_PIXEL * 5;
             canavs.width = this.CHAR_PIXEL * 3;
             const context = canvas.getContext('2d');
             context.fillStyle = '#191970';
             string.split('').forEach((fill, i) => {
                 if (fill === '1'){
                     
                 }
             });
         })

         this.reset();
        }

    collide(player, ball){
        if (player.left < ball.right && player.right > ball.left && player.top < ball.bottom && player.bottom > ball.top){
            const length = ball.velocity.length;
            ball.velocity.x = - ball.velocity.x;
            ball.velocity.y += 333 * (Math.random() - .5);
            ball.velocity.length = length * 1.08;
        }
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

        reset(){
            this.ball.position.x = this._canvas.width / 2;
            this.ball.position.y = this._canvas.height / 2;
            this.ball.velocity.x = 0;
            this.ball.velocity.y = 0;
        }

        start(){
            if (this.ball.velocity.x === 0 && this.ball.velocity.y === 0) {
                this.ball.velocity.x = 333 * (Math.random() > .5 ? 1 : -1);
                this.ball.velocity.y = 333 * (Math.random() * 2 -1);
                this.ball.velocity.length = 108;
            }
        }
        update(dt) { 
        this.ball.position.x += this.ball.velocity.x * dt;
        this.ball.position.y += this.ball.velocity.y * dt;
    
        if (this.ball.left < 0 || this.ball.right > this._canvas.width){
            const playerId = this.ball.velocity.x < 0 | 0;
            this.players[playerId].score++;
            this.reset();
        }
    
        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height){
            this.ball.velocity.y = -this.ball.velocity.y;
        }

            this.players[1].position.y = this.ball.position.y;
            this.players.forEach(player => this.collide(player, this.ball));
            this.draw();
        }
}

const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

canvas.addEventListener('mousemove', event => {
    pong.players[0].position.y = event.offsetY;
});

canvas.addEventListener('click', event => {
    pong.start();
});