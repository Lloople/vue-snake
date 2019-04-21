import {shallowMount} from '@vue/test-utils';
import Board from '@/components/Board.vue';
import SNAKE from '@/config/snake.js';
import DIRECTION from '@/config/direction.js';

describe('Board', () => {

    test('contains the desired amount of squares', () => {

        const board = shallowMount(Board, {width: 20, height: 20});

        expect(Object.keys(board.vm.squares).length).toBe(20 * 20);
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

    test('can determine where the head will be placed depending on direction', () => {

        const board = shallowMount(Board);

        expect(board.vm.guessHeadNewPosition()).toBe('9,3');

        board.setData({direction: DIRECTION.UP});
        expect(board.vm.guessHeadNewPosition()).toBe('8,2');

        board.setData({direction: DIRECTION.LEFT});
        expect(board.vm.guessHeadNewPosition()).toBe('7,3');

        board.setData({direction: DIRECTION.DOWN});
        expect(board.vm.guessHeadNewPosition()).toBe('8,4');

    });

    test('can remove snake from the board', () => {

        const board = shallowMount(Board);

        board.vm.cleanSnake();

        expect(board.vm.squares[board.vm.snakeHead]).toBe(SNAKE.NONE);

        board.vm.snakeBody.forEach(body => {
            expect(board.vm.squares[body]).toBe(SNAKE.NONE);
        });
    });

    test('can draw the snake back to the board', () => {

        const board = shallowMount(Board);

        board.vm.cleanSnake();

        expect(board.vm.squares[board.vm.snakeHead]).toBe(SNAKE.NONE);

        board.vm.resetSnake();

        expect(board.vm.squares[board.vm.snakeHead]).toBe(SNAKE.HEAD);

        board.vm.snakeBody.forEach(body => {
            expect(board.vm.squares[body]).toBe(SNAKE.BODY);
        });
    });

    test('it moves all the body parts in the correct direction', () => {
        const board = shallowMount(Board);

        // Remove the default snake from the board.
        board.vm.cleanSnake();

        board.setData({
            direction: DIRECTION.UP,
            snakeHead: '5,5',
            snakeBody: ['5,6', '5,7', '4,7']
        });

        board.vm.move();

        expect(board.vm.snakeHead).toBe('5,4');
        expect(board.vm.snakeBody[0]).toBe('5,5');
        expect(board.vm.snakeBody[1]).toBe('5,6');
        expect(board.vm.snakeBody[2]).toBe('5,7');

    });
});
