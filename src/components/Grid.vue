<template>
  <div style="width: 600px; margin: 0 auto; text-align: center;">
      <div v-for="(value, index) in tiles" :key="index">

        <tile :tile="value" :cords="index"/>
        <div v-if="isEndOfRow(index)" class="clearfix"></div>

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
      tiles: {},
      direction: SNAKE.DIRECTION_RIGHT,
      snakeHead: '3,8',
      snakeBody: [
        '3,7',
        '3,6',
        '3,5',
        '4,5',
        '5,5'
      ]
    }
  },
  methods: {
    isEndOfRow(cords) {
      return cords.match(new RegExp('.*,'+(this.width - 1), 'g')) !== null;
    },
    move() {
      this.cleanSnake();

      this.moveHead();

      let previousCords = this.snakeHead;
      this.snakeBody.forEach(cords => {
        let direction = this.guessDirectionFrom(previousCords, cords);
        let newCords = this.movePart(cords, direction);
        this.tiles[newCords] = SNAKE.BODY;
        previousCords = newCords;
      });

      // TODO: No està refrescant la posició del cap, per què? Crec que és perquè les tiles no són una computada
      // i no s'estan llegint constantment? Ni idea...

    },
    guessDirectionFrom(from, to) {
      from = from.split(',');
      to = to.split(',');

      if (to[0] < from[0]) {
        return SNAKE.DIRECTION_UP;
      }

      if (to[0] > from[0]) {
        return SNAKE.DIRECTION_DOWN;
      }

      if (to[1] < from[1]) {
        return SNAKE.DIRECTION_LEFT;
      }
      
      if (to[1] > from[1]) {
        return SNAKE.DIRECTION_RIGHT;
      }
    },
    movePart(cords, direction) {
      let coordinates = cords.split(',');

      if (direction === SNAKE.DIRECTION_UP) {
        coordinates[0]--;
      }

      if (direction === SNAKE.DIRECTION_DOWN) {
        coordinates[0]++;
      }

      if (direction === SNAKE.DIRECTION_LEFT) {
        coordinates[1]--;
      }

      if (direction === SNAKE.DIRECTION_RIGHT) {
        coordinates[1]++;
      }

      return coordinates.join(',');
    },
    moveHead() {
      this.snakeHead = this.movePart(this.snakeHead, this.direction);

      this.tiles[this.snakeHead] = SNAKE.HEAD;
    },
    cleanSnake() {
      this.tiles[this.snakeHead] = SNAKE.NONE;

      this.snakeBody.forEach(bodyPart => {
        this.tiles[bodyPart] = SNAKE.NONE;
      });
    },
  },
  created() {
    [...Array(this.width).keys()].forEach(x => {
      [...Array(this.height).keys()].forEach(y => {
        this.tiles[x+','+y] = SNAKE.NONE;
      });
    });
  },
  mounted() {
    // TODO: Check this in a future, why I need to clone the object? 🤔
    let tiles = this.tiles;
    
    tiles[this.snakeHead] = SNAKE.HEAD;

    this.snakeBody.forEach(bodyPart => {
      this.tiles[bodyPart] = SNAKE.BODY;
    });

    this.tiles = Object.assign({}, tiles);
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
