import { shallowMount } from '@vue/test-utils';
import Board from '@/components/Board.vue';

describe('Board.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Board);

    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})
