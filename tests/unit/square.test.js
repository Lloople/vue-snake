import { shallowMount } from '@vue/test-utils';
import Square from '@/components/Square.vue';
import SNAKE from '@/config/snake.js';

describe('Square.vue', () => {

  let target;

  beforeEach(() => {
    target = shallowMount(Square);
  });

  it('can determine its computed class', () => {

    target.setProps({ content: SNAKE.HEAD });
    expect(target.vm.contentClass).toBe('head');

    target.setProps({ content: SNAKE.BODY });
    expect(target.vm.contentClass).toBe('body');

    target.setProps({ content: SNAKE.FOOD });
    expect(target.vm.contentClass).toBe('food');
  })
})
