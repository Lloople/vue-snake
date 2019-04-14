<template>
    <div :class="snakeClass">
        {{ directionEmoji }}
    </div>
</template>

<script>
import SNAKE from './../config/snake.js';

export default {
    name: 'Tile',
    props: {
        x: Number,
        y: Number,
        snakeClass: String,
        direction: String,
    },
    computed: {
        directionEmoji() {
            if (this.direction === SNAKE.DIRECTION_UP) {
                return '🔼';
            }

            if (this.direction === SNAKE.DIRECTION_DOWN) {
                return '🔽';
            }

            if (this.direction === SNAKE.DIRECTION_LEFT) {
                return '⬅️';
            }

            if (this.direction === SNAKE.DIRECTION_RIGHT) {
                return '➡️'
            }

            return '';
        }
    }
}
</script>

<style scoped>
div {
    width: 40px;
    height: 40px;
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
</style>