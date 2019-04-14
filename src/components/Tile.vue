<template>
    <div :class="{ body: isBody, head : isHead }">
        {{ direction }}
    </div>
</template>

<script>
import EmptyTile from './../models/EmptyTile.js';
import SnakeHead from './../models/SnakeHead.js';
import SnakeBody from './../models/SnakeBody.js';


export default {
    name: 'Tile',
    props: {
        x: Number,
        y: Number,
        content: Object
    },
    computed: {
        isBody: function () {
            return this.content instanceof SnakeBody;
        },
        isHead: function () {
            return this.content instanceof SnakeHead;
        },
        direction: function () {
            if (! this.isHead) {
                return '';
            }

            return this.content.getDirection();

        }
    },
    methods: {
        isCollision(x, y) {
            return this.hasSnake && this.x === x && this.y === y;
        },
        moveIn(bodyPart) {
            this.content = bodyPart;
        },
        moveOut() {
            this.content = new EmptyTile();
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