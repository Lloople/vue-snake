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
	background: rgb(196, 183, 183);
	margin: 0.5px;
	border-radius: 2px;
}

.body {
	background: rgb(76, 185, 109);
}

.head {
	background: rgb(16, 88, 22);
}

.food {
    background: rgb(187, 59, 27);
}
</style>