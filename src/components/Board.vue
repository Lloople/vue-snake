<template>
	<div class="container">
		<div class="grid">
			<div v-for='(value, index) in tiles' :key='index'>
				<square :content='value' :class='{ clearfix : index.match(/.*,0/) !== null }'/>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="panel">
			<button v-on:click='start' class="btn" :class="{ 'btn-pressed' : gameRunning }">
				PLAY
			</button>
			<h2>SCORE: {{ score }}</h2>
			<h2 v-show="message !== null">{{ message }}</h2>
		</div>
	</div>
</template>

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
			tiles: this.resetGrid(),
			direction: DIRECTION.RIGHT,
			snakeHead: SNAKE.HEAD_START,
			snakeBody: SNAKE.BODY_START,
			score: 0,
			message: null
		};
	},
	created() {
		window.addEventListener("keyup", this.listenKeysPressed);

		this.resetSnake();
	},
	beforeDestroy() {
		this.stop();
	},
	methods: {
		start() {
			if (this.gameRunning !== null) {
				return;
			}

			this.message = null;
			
			this.score = 0;

			this.resetSnake();

			this.tiles[this.getFoodRandomCoords()] = SNAKE.FOOD;

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
			this.stop();
			this.message = `GAME OVER`;
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

			this.tiles[this.snakeHead] = SNAKE.HEAD;

			this.snakeBody = this.snakeBody.map(coords => {
				let newCoords = nextBodyPosition;

				this.tiles[newCoords] = SNAKE.BODY;

				nextBodyPosition = coords;

				return newCoords;
			});
		},
		isCollision(coords) {
			return this.isSelfCollision(coords) || this.isBorderCollision(coords);
		},
		isSelfCollision(coords) {
			return this.tiles[coords] === SNAKE.BODY;
		},
		isBorderCollision(coords) {
			let coordinates = coords.split(',');
			
			return coordinates[0] < 0
				|| coordinates[1] < 0
				|| coordinates[0] == this.width
				|| coordinates[1] == this.height;
		},
		eat() {
			if (this.tiles[this.snakeHead] !== SNAKE.FOOD) {
				return;
			}

			this.score++;

			this.snakeBody.push(this.newBodyCoords());

			this.tiles[this.getFoodRandomCoords()] = SNAKE.FOOD;

			this.increaseSpeed();
		},
		getFoodRandomCoords() {
			let randomCoords = [
				Math.floor(Math.random() * (this.width - 1)),
				Math.floor(Math.random() * (this.height - 1))
			].join(",");

			if (this.tiles[randomCoords] !== SNAKE.NONE) {
				return this.getFoodRandomCoords();
			}

			return randomCoords;
			
		},
		increaseSpeed() {
			this.speed -= this.speed * 0.10;

			this.run();
		},
		newBodyCoords() {
			let coordinates = this.snakeBody[this.snakeBody.length - 1].split(
				","
			);

			if (this.direction === DIRECTION.UP) {
				coordinates[0]++;
			}

			if (this.direction === DIRECTION.DOWN) {
				coordinates[0]--;
			}

			if (this.direction === DIRECTION.LEFT) {
				coordinates[1]++;
			}

			if (this.direction === DIRECTION.RIGHT) {
				coordinates[1]--;
			}

			return coordinates.join(",");
		},
		guessHeadNewPosition() {
			let coordinates = this.snakeHead.split(",");

			if (this.direction === DIRECTION.UP) {
				coordinates[0]--;
			}

			if (this.direction === DIRECTION.DOWN) {
				coordinates[0]++;
			}

			if (this.direction === DIRECTION.LEFT) {
				coordinates[1]--;
			}

			if (this.direction === DIRECTION.RIGHT) {
				coordinates[1]++;
			}

			return coordinates.join(",");
		},
		cleanSnake() {
			this.tiles[this.snakeHead] = SNAKE.NONE;

			this.snakeBody.forEach(coords => {
				this.tiles[coords] = SNAKE.NONE;
			});
		},
		resetSnake() {
			this.tiles[SNAKE.HEAD_START] = SNAKE.HEAD;

			SNAKE.BODY_START.forEach(coords => {
				this.tiles[coords] = SNAKE.BODY;
			});
		},
		resetGrid() {
			let tiles = {};
			[...Array(this.width).keys()].forEach(x => {
				[...Array(this.height).keys()].forEach(y => {
					tiles[x + "," + y] = SNAKE.NONE;
				});
			});

			return tiles;
		},
		listenKeysPressed(e) {
			if (e.keyCode === KEYS.UP && this.direction !== DIRECTION.DOWN) {
				this.direction = DIRECTION.UP;
			}

			if (e.keyCode === KEYS.DOWN && this.direction !== DIRECTION.UP) {
				this.direction = DIRECTION.DOWN;
			}

			if (e.keyCode === KEYS.LEFT && this.direction !== DIRECTION.RIGHT) {
				this.direction = DIRECTION.LEFT;
			}

			if (e.keyCode === KEYS.RIGHT && this.direction !== DIRECTION.LEFT) {
				this.direction = DIRECTION.RIGHT;
			}

			if (e.keyCode === KEYS.SPACE && ! this.gameRunning) {
				this.start();
			}
		}
	}
};
</script>