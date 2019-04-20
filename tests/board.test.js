import mount from '@vue/test-utils';
import Board from '@src/components/Board.vue';

describe('Board', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Board);
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})