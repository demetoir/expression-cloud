import { mount } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'

// todo this is test
describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})
