<template>
  <div style="width: 1100px; margin: 0 auto;">
      <div class="clearfix" v-for="x in width" :key="x">
        <div v-for="y in height" :key="y">
            <tile :x="x" :y="y" :snakeClass="guessContent(x, y)"/>
        </div>
      </div>
  </div>
</template>

<script>
import Tile from './Tile.vue';
import SNAKE from './../config/snake.js';

export default {

  name: 'Grid',
  components: {
    Tile
  },
  props: {
    width: Number,
    height: Number
  },
  data() {
    return {
      direction: SNAKE.DIRECTION_LEFT,
      snake: [
        [3, 4],
        [3, 5],
        [3, 6],
        [4, 6],
        [5, 6]
      ]
    }
  },
  methods: {
    advance() {
    },
    guessContent(x, y) {
      this.snake.forEach((part, index) => {
        if (part[0] === x && part[1] === y) {
          
          return index === 0 ? SNAKE.HEAD : SNAKE.BODY;
        }
      });

      return SNAKE.NONE;
    }
  },
  mounted() {
      // TODO: Hi ha molt de merder, perquè no tinc els tiles en un array
      // sinó que estàn directament al Vue, i els necessitaria tenir 
      // guardats a més per clau-valor per poder canviar el seu contingut
  }
}
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
  clear: both;
}
</style>
