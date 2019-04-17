<template>
	<div :class='{ head: isHead, body : isBody, food : isFood }'></div>
</template>

<script>
import SNAKE from "./../config/snake.js";

export default {
	name: "Tile",
	props: {
		tile: Number,
		cords: String
	},
	computed: {
		isHead() {
			return this.tile === SNAKE.HEAD;
		},
		isBody() {
			return this.tile === SNAKE.BODY;
        },
        isFood() {
            return this.tile === SNAKE.FOOD;
        }
	}
};
</script>

<style scoped>
div {
	width: 20px;
	height: 20px;
	float: left;
	background: grey;
	margin: 1px;
}

.body {
	background: blue;
}

.head {
	background: red;
}

.food {
    background: yellow;
}
</style>