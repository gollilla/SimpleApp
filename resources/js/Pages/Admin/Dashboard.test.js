import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminDashboard from './Dashboard.vue'

/**
 * 管理画面ダッシュボードコンポーネントのテスト
 */

// Inertiaのモック
vi.mock('@inertiajs/vue3', () => ({
  Head: {
    name: 'Head',
    props: ['title'],
    template: '<div></div>'
  }
}))

// AdminLayoutのモック
vi.mock('@/Layouts/AdminLayout.vue', () => ({
  name: 'AdminLayout',
  template: `
    <div>
      <header v-if="$slots.header"><slot name="header" /></header>
      <main><slot /></main>
    </div>
  `
}))

describe('AdminDashboard', () => {
  let wrapper
  const mockStats = {
    total_users: 100,
    admin_users: 5,
    regular_users: 95,
    verified_users: 80
  }
  const mockRecentUsers = [
    {
      id: 1,
      name: 'テストユーザー1',
      email: 'test1@example.com',
      role: 'user',
      role_label: 'ユーザー',
      created_at: '2025-06-05 12:00:00'
    },
    {
      id: 2,
      name: 'テストユーザー2',
      email: 'test2@example.com',
      role: 'admin',
      role_label: '管理者',
      created_at: '2025-06-05 11:00:00'
    }
  ]

  beforeEach(() => {
    wrapper = mount(AdminDashboard, {
      props: {
        stats: mockStats,
        recent_users: mockRecentUsers
      }
    })
  })

  it('正常にレンダリングされる', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('統計カードが表示される', () => {
    // 総ユーザー数
    expect(wrapper.html()).toContain('総ユーザー数')
    expect(wrapper.html()).toContain('100')
    
    // 管理者数
    expect(wrapper.html()).toContain('管理者数')
    expect(wrapper.html()).toContain('5')
    
    // 一般ユーザー数
    expect(wrapper.html()).toContain('一般ユーザー数')
    expect(wrapper.html()).toContain('95')
    
    // 認証済みユーザー数
    expect(wrapper.html()).toContain('認証済みユーザー数')
    expect(wrapper.html()).toContain('80')
  })

  it('最近登録されたユーザーの一覧が表示される', () => {
    expect(wrapper.html()).toContain('最近登録されたユーザー')
    expect(wrapper.html()).toContain('テストユーザー1')
    expect(wrapper.html()).toContain('test1@example.com')
    expect(wrapper.html()).toContain('テストユーザー2')
    expect(wrapper.html()).toContain('test2@example.com')
  })

  it('ユーザーのロールバッジが正しく表示される', () => {
    // ロールラベルが表示される
    expect(wrapper.html()).toContain('ユーザー')
    expect(wrapper.html()).toContain('管理者')
  })

  it('ロールバッジの色が正しく設定される', () => {
    // getRoleBadgeClassメソッドのテスト
    const component = wrapper.vm
    
    // 管理者は secondary バッジ
    expect(component.getRoleBadgeClass('admin')).toBe('badge-secondary')
    
    // 一般ユーザーは primary バッジ
    expect(component.getRoleBadgeClass('user')).toBe('badge-primary')
  })

  it('最近のユーザーが空の場合の表示', async () => {
    await wrapper.setProps({
      stats: mockStats,
      recent_users: []
    })

    expect(wrapper.html()).toContain('まだユーザーが登録されていません')
  })
})