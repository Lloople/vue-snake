<template>
    <div :data-coords='coords' class="square" :class="contentClass"></div>
</template>
<style>
    div.square {
        width: 20px;
        height: 20px;
        float: left;
        background: #dae1e7;
        margin: 0.5px;
        border-radius: 2px;
    }

    .square.body {
        background: rgb(76, 185, 109);
    }

    .square.head {
        background: rgb(16, 88, 22);
    }

    .square.food {
        background: rgb(187, 59, 27);
    }
</style>
<script>
    import SNAKE from "./../config/snake.js";

    export default {
        name: "Square",
        props: {
            content: Number,
            coords: String
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
