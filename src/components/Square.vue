<template>
	<div class="square" :class="contentClass"></div>
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