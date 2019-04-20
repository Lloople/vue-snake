import { shallowMount } from '@vue/test-utils';
import Board from '@/components/Board.vue';
import SNAKE from '@/config/snake.js';

describe('Board.vue', () => {

  test('contains the desired amount of squares', () => {
    
    const board = shallowMount(Board, { width: 20, height: 20 });

    expect(Object.keys(board.vm.squares).length).toBe(20*20);
  });

  test('snake is loaded in the default squares', () => {

    const board = shallowMount(Board);

    expect(board.vm.squares[SNAKE.HEAD_START]).toBe(SNAKE.HEAD);

  });

  test('increases speed by 10%', () => {

    const board = shallowMount(Board);

    board.vm.increaseSpeed();
    expect(board.vm.speed).toBe(450);

    board.vm.increaseSpeed();
    expect(board.vm.speed).toBe(405);

  });

  test('increases score on eat', () => {

    const board = shallowMount(Board);

    board.vm.squares[board.vm.snakeHead] = SNAKE.FOOD;

    board.vm.eat();
    board.vm.eat();
    board.vm.eat();
    board.vm.eat();

    expect(board.vm.score).toBe(4);

  });

  test('puts food in a random non occupied coord', () => {

    const board = shallowMount(Board);

    expect(board.vm.squares[board.vm.getFoodRandomCoords()]).toBe(SNAKE.NONE);
    expect(board.vm.squares[board.vm.getFoodRandomCoords()]).toBe(SNAKE.NONE);
    expect(board.vm.squares[board.vm.getFoodRandomCoords()]).toBe(SNAKE.NONE);
    expect(board.vm.squares[board.vm.getFoodRandomCoords()]).toBe(SNAKE.NONE);
    expect(board.vm.squares[board.vm.getFoodRandomCoords()]).toBe(SNAKE.NONE);

  });

  test('can detect self collision', () => {

    const board = shallowMount(Board);

    expect(board.vm.isSelfCollision(
      board.vm.snakeBody[0]
    )).toBeTruthy();
  });
  
  test('can detect border collision', () => {

    const board = shallowMount(Board);

    expect(board.vm.isBorderCollision('-1,0')).toBeTruthy();
    expect(board.vm.isBorderCollision('1,-1')).toBeTruthy();
    expect(board.vm.isBorderCollision('0,20')).toBeTruthy();
    expect(board.vm.isBorderCollision('20,0')).toBeTruthy();
  });

  test('can guess next body piece coords', () => {

    const board = shallowMount(Board);

    expect(board.vm.newBodyCoords()).toBe('5,6');

  });
})
