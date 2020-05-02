<template>
    <div class="container">
        <div class="board-grid text-center mx-auto block" style="width: 450px">
            <div v-for='(value, index) in squares' :key='index'>
                <square :coords='index' :content='value' :class='{ "clear-left" : index.match(/^0,.*/) !== null }'/>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="panel">
            <button v-on:click='start' class="select-none uppercase font-bold bg-gray-300 font-bold py-2 px-4 border-b-4 hover:border-b-2 hover:border-t-2 border-gray-500 rounded" :class='{ "bg-gray-500" : gameRunning }' :disabled="gameRunning">
                PLAY
            </button>
            <br>
            <div class="mt-4">
                <a class=" mt-8" href="https://github.com/lloople/vue-snake" target="_blank">GitHub</a>&nbsp;
                <a href="#" v-on:click='showScoreboard = ! showScoreboard'>Scoreboard</a>

            </div>
        
            <h2 class="mt-4">SCORE: {{ score }}</h2>
            <h2 class="mt-4 text-xl font-bold" v-show="isGameOver">🐍 GAME OVER 💀</h2>

            <div v-show='showScoreboard' class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Scoreboard
                            </h3>
                            <ul class="mt-2">
                                <li v-for="(score, index) in scoreboard" :key="index">{{ score.username }}: {{ score.score }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Square from "./Square.vue";
    import SNAKE from "./../config/snake.js";
    import KEYS from "./../config/keys.js";
    import DIRECTION from "./../config/direction.js";
    import { db } from "./../config/firebase.js";

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
                scoreboard: [],
                showScoreboard: false
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

                setTimeout(() => { this.publishScore(); }, 250);
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

                this.score++;

                this.snakeBody.push('0,0');

                this.squares[this.getFoodRandomCoords()] = SNAKE.FOOD;

                this.increaseSpeed();
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

                // TODO: add keys for pause and resume with space and letter P

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
            async publishScore() {
                if (this.score <= this.scoreboard[this.scoreboard - 1]) {
                    return;
                }

                localStorage.username = window.prompt('Please, enter your username so we can publish your score', localStorage.username);

                await db.collection('scoreboard').add({
                    username: localStorage.username,
                    score: this.score
                })
            }
        },
        firestore: {
            scoreboard: db.collection('scoreboard').orderBy('score', 'desc').limit(100)
        }
    };
</script>
