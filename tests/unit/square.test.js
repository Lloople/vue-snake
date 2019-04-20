import { shallowMount } from '@vue/test-utils';
import Square from '@/components/Square.vue';
import SNAKE from '@/config/snake.js';

describe('Square.vue', () => {

  test('can determine it\'s computed class', () => {

    const square = shallowMount(Square);

    expect(square.vm.contentClass).toBe(null);

    square.setProps({ content: SNAKE.HEAD });
    expect(square.vm.contentClass).toBe('head');

    square.setProps({ content: SNAKE.BODY });
    expect(square.vm.contentClass).toBe('body');

    square.setProps({ content: SNAKE.FOOD });
    expect(square.vm.contentClass).toBe('food');
  })
})
