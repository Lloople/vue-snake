import { shallowMount } from '@vue/test-utils';
import Board from '@/components/Board.vue';
import SNAKE from '@/config/snake.js';

describe('Board.vue', () => {

  let board;

  beforeEach(() => {
    board = shallowMount(Board, { width: 20, height: 20 });
  });


  it('contains the desired amount of squares', () => {

    expect(Object.keys(board.vm.tiles).length).toBe(20*20);
  });

  it('loads snake in the default squares', () => {

    expect(board.vm.tiles[SNAKE.HEAD_START]).toBe(SNAKE.HEAD);

  });

  it('increases speed by 10%', () => {

    board.vm.increaseSpeed();

    expect(board.vm.speed).toBe(450);

  });

  it('increases score on eat', () => {

    board.vm.tiles[board.vm.snakeHead] = SNAKE.FOOD;

    board.vm.eat();
    board.vm.eat();
    board.vm.eat();
    board.vm.eat();

    expect(board.vm.score).toBe(4);

  });
})
