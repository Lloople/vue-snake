<template>
    <div class="container">
        <div class="grid">
            <div v-for='(value, index) in squares' :key='index'>
                <square :coords='index' :content='value' :class='{ clearfix : index.match(/^0,.*/) !== null }'/>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="panel">
            <button v-on:click='start' class="btn" :class="{ 'btn-pressed' : gameRunning }" :disabled="gameRunning">
                PLAY
            </button>

            <h2>SCORE: {{ score }}</h2>
            <h2 v-show="isGameOver">🐍 GAME OVER 💀</h2>
        </div>
    </div>
</template>
<style>
    .clearfix {
        clear: left;
    }

    .grid {
        width: 450px;
        text-align: center;
        margin: 0 auto;
        display: block;
    }

    .btn {
        font-weight: bold;
        font-size: 22px;
        margin-top: 10px;
        padding: 14px;
        background: #dae1e7;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 0px 6px #a4abb1;
        user-select: none;
        border: none;
    }

    .container {
        margin: 0 auto 20px auto;
        text-align: center;
    }

    .btn-pressed {
        box-shadow: none;
        background: #a4abb1;
        top: 6px;
        position: relative;
    }

</style>
<script>
    import Square from "./Square.vue";
    import SNAKE from "./../config/snake.js";
    import KEYS from "./../config/keys.js";
    import DIRECTION from "./../config/direction.js";

    export default {
        name: "Grid",
        components: {
            Square
        },
        props: {
            width: {
                type: Number,
                default: 20
            },
            height: {
                type: Number,
                default: 20
            }
        },
        data() {
            return {
                gameRunning: null,
                speed: 500,
                squares: this.resetGrid(),
                direction: DIRECTION.RIGHT,
                snakeHead: SNAKE.HEAD_START,
                snakeBody: SNAKE.BODY_START,
                score: 0,
                isGameOver: false,
                canChangeDirection: true,
                scoreboard: [] // TO-DO: Show scoreboard in a pop-up or something
            };
        },
        created() {
            window.addEventListener("keydown", this.listenKeysPressed);
            this.audioMap = {
                gameStart: new Audio('sounds/game_start.wav'),
                gameOver: new Audio('sounds/game_over.wav'),
                eat: new Audio('sounds/eat.wav')
            };
            this.resetSnake();
            this.refreshScoreboard();
        },
        beforeDestroy() {
            this.stop();
        },
        methods: {
            start() {
                this.playSound('gameStart');
                if (this.gameRunning !== null) {
                    return;
                }

                this.resetGame();
                this.run();
            },
            run() {
                this.stop();

                this.gameRunning = setInterval(() => {
                    this.move();
                }, this.speed);
            },
            stop() {
                clearInterval(this.gameRunning);

                this.gameRunning = null;
            },
            gameOver() {
                this.playSound('gameOver');

                this.stop();

                this.isGameOver = true;

                this.publishScore();
            },
            move() {
                let nextBodyPosition = this.snakeHead;
                let nextHeadPosition = this.guessHeadNewPosition();

                if (this.isCollision(nextHeadPosition)) {
                    this.gameOver();

                    return;
                }

                this.snakeHead = nextHeadPosition;

                this.eat();

                this.cleanSnake();

                this.squares[this.snakeHead] = SNAKE.HEAD;

                this.snakeBody = this.snakeBody.map(coords => {
                    let newCoords = nextBodyPosition;

                    this.squares[newCoords] = SNAKE.BODY;

                    nextBodyPosition = coords;

                    return newCoords;
                });

                this.canChangeDirection = true;
            },
            isCollision(coords) {
                return this.isSelfCollision(coords) || this.isBorderCollision(coords);
            },
            isSelfCollision(coords) {
                return this.squares[coords] === SNAKE.BODY;
            },
            isBorderCollision(coords) {
                let coordinates = coords.split(',');

                return coordinates[0] < 0
                    || coordinates[1] < 0
                    || coordinates[0] == this.width
                    || coordinates[1] == this.height;
            },
            eat() {
                // Missing test
                if (this.squares[this.snakeHead] !== SNAKE.FOOD) {
                    return;
                }

                this.playSound('eat');

                this.addScorePoint();

                this.snakeBody.push('0,0');

                this.squares[this.getFoodRandomCoords()] = SNAKE.FOOD;

                this.increaseSpeed();
            },
            addScorePoint() {

                this.score++;

            },
            getFoodRandomCoords() {
                let randomCoords = [
                    Math.floor(Math.random() * this.width),
                    Math.floor(Math.random() * this.height)
                ];

                if (this.squares[randomCoords.toString()] !== SNAKE.NONE || randomCoords[0] === this.width || randomCoords[1] === this.height) {
                    return this.getFoodRandomCoords();
                }

                return randomCoords.toString();
            },
            increaseSpeed() {
                if (this.speed <= 90) {
                    return;
                }

                this.speed -= this.speed * 0.10;

                this.run();
            },
            guessHeadNewPosition() {
                let coordinates = this.snakeHead.split(",");

                if (this.direction === DIRECTION.UP) {
                    coordinates[1]--;
                }

                if (this.direction === DIRECTION.DOWN) {
                    coordinates[1]++;
                }

                if (this.direction === DIRECTION.LEFT) {
                    coordinates[0]--;
                }

                if (this.direction === DIRECTION.RIGHT) {
                    coordinates[0]++;
                }

                return coordinates.join(",");
            },
            cleanSnake() {
                this.squares[this.snakeHead] = SNAKE.NONE;

                this.snakeBody.forEach(coords => {
                    this.squares[coords] = SNAKE.NONE;
                });
            },
            resetSnake() {
                this.squares[SNAKE.HEAD_START] = SNAKE.HEAD;

                SNAKE.BODY_START.forEach(coords => {
                    this.squares[coords] = SNAKE.BODY;
                });
            },
            resetGrid() {
                let squares = {};
                [...Array(this.height).keys()].forEach(y => {
                    [...Array(this.width).keys()].forEach(x => {
                        squares[x + "," + y] = SNAKE.NONE;
                    });
                });

                return squares;
            },
            listenKeysPressed(e) {
                // Missing test
                if (e.which === KEYS.UP && this.direction !== DIRECTION.DOWN && this.canChangeDirection) {
                    this.direction = DIRECTION.UP;
                }

                if (e.which === KEYS.DOWN && this.direction !== DIRECTION.UP && this.canChangeDirection) {
                    this.direction = DIRECTION.DOWN;
                }

                if (e.which === KEYS.LEFT && this.direction !== DIRECTION.RIGHT && this.canChangeDirection) {
                    this.direction = DIRECTION.LEFT;
                }

                if (e.which === KEYS.RIGHT && this.direction !== DIRECTION.LEFT && this.canChangeDirection) {
                    this.direction = DIRECTION.RIGHT;
                }

                if (e.which === KEYS.SPACE && !this.gameRunning) {
                    this.start();
                }
                this.canChangeDirection = false;
            },
            playSound(sound) {
                if (this.audioMap[sound]) {
                    this.audioMap[sound].play();
                }
            },
            resetGame(){
                this.isGameOver = false;

                this.score = 0;

                this.speed = 500;

                this.squares = this.resetGrid();
                this.direction = DIRECTION.RIGHT;
                this.snakeHead = SNAKE.HEAD_START;
                this.snakeBody = SNAKE.BODY_START;
                this.canChangeDirection = true;
                this.resetSnake();

                this.squares[this.getFoodRandomCoords()] = SNAKE.FOOD;
            },
            publishScore() {
                if (this.score <= this.scoreboard[this.scoreboard - 1]) {
                    return;
                }

                localStorage.username = window.prompt('Please, enter your username so we can publish your score', localStorage.username);

                // TO-DO: send request to store new score (localStorage.username, this.score);

                this.refreshScoreboard();
            },
            refreshScoreboard() {
                // To-DO: this.scoreboard = some query to some server...
            }
            
        }
    };
</script>
