import { mount } from '@vue/test-utils';
import { describe } from '@jest/globals';
import Logo from '@/components/atoms/Logo.vue';

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo);
    expect(wrapper.vm).toBeTruthy();
  });
});
