<template>
	<div :class="contentClass"></div>
</template>

<script>
import SNAKE from "./../config/snake.js";

export default {
	name: "Square",
	props: {
		content: Number
	},
	computed: {
		contentClass() {
			if (this.content === SNAKE.BODY) {
				return 'body';
			}

			if (this.content === SNAKE.HEAD) {
				return 'head';
			}

			if (this.content === SNAKE.FOOD) {
				return 'food';
			}

			return null;
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