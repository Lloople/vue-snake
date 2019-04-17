<template>
	<div class='flex-1 align-middle content-center w-1/2 mx-auto'>
		<div>
			<div v-for='(value, index) in tiles' :key='index'>
				<tile :tile='value' :cords='index' :class='{ clearfix : index.match(/.*,0/) !== null }'/>
			</div>
		</div>
		<div>
			<button
				v-on:click='start'
				class='btn p-4 m-4 rounded-lg bg-green-light focus:outline-none'
			>{{ gameRunning !== null ? 'PLAYING...' : 'START GAME' }}</button>
		</div>
	</div>
</template>

<script>
import Tile from "./Tile.vue";
import SNAKE from "./../config/snake.js";

export default {
	name: "Grid",
	components: {
		Tile
	},
	props: {
		width: Number,
		height: Number
	},
	data() {
		return {
			gameRunning: null,
			speed: 50,
			tiles: this.resetGrid(),
			direction: SNAKE.DIRECTION_RIGHT,
			snakeHead: SNAKE.HEAD_START,
			snakeBody: SNAKE.BODY_START
		};
	},
	created() {
		window.addEventListener("keyup", this.listenKeysPressed);

		this.resetGrid();

		this.resetSnake();
	},
	beforeDestroy() {
		clearInterval(this.gameRunning);
	},
	methods: {
		start() {
			if (this.gameRunning !== null) {
				return;
			}

			let counter = 0;

			this.gameRunning = setInterval(() => {
				this.move();

				counter++;
			}, this.speed);
		},
		move() {
			this.cleanSnake();

			let nextBodyPosition = this.snakeHead;

			this.snakeHead = this.guessHeadNewPosition();

			this.tiles[this.snakeHead] = SNAKE.HEAD;

			this.snakeBody = this.snakeBody.map(cords => {
				let newCords = nextBodyPosition;

				this.tiles[newCords] = SNAKE.BODY;

				nextBodyPosition = cords;

				return newCords;
			});
		},
		newBodyCords() {
			let coordinates = this.snakeBody[this.snakeBody.length - 1].split(
				","
			);

			if (this.direction === SNAKE.DIRECTION_UP) {
				coordinates[0]++;
			}

			if (this.direction === SNAKE.DIRECTION_DOWN) {
				coordinates[0]--;
			}

			if (this.direction === SNAKE.DIRECTION_LEFT) {
				coordinates[1]++;
			}

			if (this.direction === SNAKE.DIRECTION_RIGHT) {
				coordinates[1]--;
			}

			return coordinates.join(",");
		},
		guessHeadNewPosition() {
			let coordinates = this.snakeHead.split(",");

			if (this.direction === SNAKE.DIRECTION_UP) {
				coordinates[0]--;
			}

			if (this.direction === SNAKE.DIRECTION_DOWN) {
				coordinates[0]++;
			}

			if (this.direction === SNAKE.DIRECTION_LEFT) {
				coordinates[1]--;
			}

			if (this.direction === SNAKE.DIRECTION_RIGHT) {
				coordinates[1]++;
			}

			return coordinates.join(",");
		},
		cleanSnake() {
			this.tiles[this.snakeHead] = SNAKE.NONE;

			this.snakeBody.forEach(cords => {
				this.tiles[cords] = SNAKE.NONE;
			});
		},
		resetSnake() {
			this.tiles[SNAKE.HEAD_START] = SNAKE.HEAD;

			SNAKE.BODY_START.forEach(cords => {
				this.tiles[cords] = SNAKE.BODY;
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
			if (e.keyCode === KEYS.UP && this.direction !== SNAKE.DIRECTION_DOWN) {
				this.direction = SNAKE.DIRECTION_UP;
			}

			if (e.keyCode === KEYS.DOWN && this.direction !== SNAKE.DIRECTION_UP) {
				this.direction = SNAKE.DIRECTION_DOWN;
			}

			if (e.keyCode === KEYS.LEFT && this.direction !== SNAKE.DIRECTION_RIGHT) {
				this.direction = SNAKE.DIRECTION_LEFT;
			}

			if (e.keyCode === KEYS.RIGHT && this.direction !== SNAKE.DIRECTION_LEFT) {
				this.direction = SNAKE.DIRECTION_RIGHT;
			}

			if (e.keyCode === KEYS.SPACE && ! this.gameRunning) {
				this.start();
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}

.clearfix {
	clear: left;
}
</style>
