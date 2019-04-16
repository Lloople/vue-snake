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
			speed: 200,
			tiles: {},
			direction: SNAKE.DIRECTION_RIGHT,
			snakeHead: SNAKE.HEAD_START,
			snakeBody: SNAKE.BODY_START
		};
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

				if (counter === 10) {
					this.direction = SNAKE.DIRECTION_DOWN;
				}

				if (counter === 25) {
					this.direction = SNAKE.DIRECTION_LEFT;
				}

				if (counter === 35) {
					this.cleanSnake();

					clearInterval(this.gameRunning);

					this.gameRunning = null;

					this.resetSnake();
				}
			}, this.speed);
		},
		move() {
			this.cleanSnake();

			let previousCords = this.snakeHead;

			this.snakeHead = this.guessHeadNewPosition();

			this.tiles[this.snakeHead] = SNAKE.HEAD;

			this.snakeBody = this.snakeBody.map(cords => {
				this.tiles[previousCords] = SNAKE.BODY;

				let newCords = previousCords;

				previousCords = cords;

				return newCords;
			});
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
			[...Array(this.width).keys()].forEach(x => {
				[...Array(this.height).keys()].forEach(y => {
					this.tiles[x + "," + y] = SNAKE.NONE;
				});
			});
		}
	},
	created() {
		this.resetGrid();

		this.resetSnake();
	},
	mounted() {
		// Why the f*** the code doesn't work without this line??
		this.tiles = Object.assign({}, this.tiles);
	},
	beforeDestroy() {
		clearInterval(this.gameRunning);
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
