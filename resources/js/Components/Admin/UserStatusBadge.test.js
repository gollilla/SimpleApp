import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserStatusBadge from './UserStatusBadge.vue'

/**
 * UserStatusBadge コンポーネントのテスト
 */
describe('UserStatusBadge', () => {
  it('activeステータスが正しく表示される', () => {
    const wrapper = mount(UserStatusBadge, {
      props: {
        status: 'active',
        label: 'アクティブ'
      }
    })

    expect(wrapper.text()).toContain('アクティブ')
    expect(wrapper.find('.badge').classes()).toContain('badge-success')
    expect(wrapper.text()).toContain('✅')
  })

  it('inactiveステータスが正しく表示される', () => {
    const wrapper = mount(UserStatusBadge, {
      props: {
        status: 'inactive',
        label: '非アクティブ'
      }
    })

    expect(wrapper.text()).toContain('非アクティブ')
    expect(wrapper.find('.badge').classes()).toContain('badge-neutral')
    expect(wrapper.text()).toContain('⚪')
  })

  it('pendingステータスが正しく表示される', () => {
    const wrapper = mount(UserStatusBadge, {
      props: {
        status: 'pending',
        label: '承認待ち'
      }
    })

    expect(wrapper.text()).toContain('承認待ち')
    expect(wrapper.find('.badge').classes()).toContain('badge-warning')
    expect(wrapper.text()).toContain('⏳')
  })

  it('suspendedステータスが正しく表示される', () => {
    const wrapper = mount(UserStatusBadge, {
      props: {
        status: 'suspended',
        label: '停止中'
      }
    })

    expect(wrapper.text()).toContain('停止中')
    expect(wrapper.find('.badge').classes()).toContain('badge-error')
    expect(wrapper.text()).toContain('🚫')
  })

  it('未知のステータスがデフォルト表示される', () => {
    const wrapper = mount(UserStatusBadge, {
      props: {
        status: 'unknown',
        label: 'unknown'
      }
    })

    expect(wrapper.text()).toContain('unknown')
    expect(wrapper.find('.badge').classes()).toContain('badge-neutral')
    expect(wrapper.text()).toContain('❓')
  })
})