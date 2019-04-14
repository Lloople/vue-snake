const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';

export default class SnakeHead {

    direction = DIRECTION_UP;

    forward() {
        if (this.direction === DIRECTION_UP) {

        }
    }

    getDirection() {
        if (this.direction === DIRECTION_UP) {
            return '🔼';
        }

        if (this.direction === DIRECTION_DOWN) {
            return '🔽';
        }

        if (this.direction === DIRECTION_LEFT) {
            return '⬅️';
        }

        if (this.direction === DIRECTION_RIGHT) {
            return '➡️'
        }

        return '😕';
    }

}