import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminUsers from './Users.vue'

/**
 * 管理画面ユーザー管理コンポーネントのテスト
 */

// Inertiaのモック
vi.mock('@inertiajs/vue3', () => ({
  Head: {
    name: 'Head',
    props: ['title'],
    template: '<div></div>'
  },
  Link: {
    name: 'Link',
    props: ['href', 'preserve-state'],
    template: '<a :href="href"><slot /></a>'
  },
  router: {
    get: vi.fn(),
    delete: vi.fn()
  },
  useForm: () => ({
    data: () => ({}),
    processing: false,
    errors: {},
    reset: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  })
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

// Routeのモック
global.route = vi.fn((name, params) => {
  if (params) {
    return `/${name.replace('.', '/')}/${params}`
  }
  return `/${name.replace('.', '/')}`
})

describe('AdminUsers', () => {
  let wrapper
  const mockUsers = {
    data: [
      {
        id: 1,
        name: 'テストユーザー1',
        email: 'test1@example.com',
        role: 'user',
        role_label: 'ユーザー',
        email_verified_at: '2025-06-05 12:00:00',
        created_at: '2025-06-05 10:00:00'
      },
      {
        id: 2,
        name: 'テストユーザー2',
        email: 'test2@example.com',
        role: 'admin',
        role_label: '管理者',
        email_verified_at: null,
        created_at: '2025-06-05 09:00:00'
      }
    ],
    links: [
      { label: '&laquo; Previous', url: null },
      { label: '1', url: '/admin/users?page=1', active: true },
      { label: 'Next &raquo;', url: null }
    ]
  }
  const mockRoleOptions = [
    { value: 'user', label: 'ユーザー' },
    { value: 'admin', label: '管理者' }
  ]

  beforeEach(() => {
    wrapper = mount(AdminUsers, {
      props: {
        users: mockUsers,
        filters: { search: '', role: '' },
        role_options: mockRoleOptions
      },
      global: {
        mocks: {
          route: global.route
        }
      }
    })
  })

  it('正常にレンダリングされる', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('検索フォームが表示される', () => {
    expect(wrapper.find('input[placeholder="名前またはメールアドレス"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.html()).toContain('検索')
    expect(wrapper.html()).toContain('リセット')
  })

  it('ユーザー一覧テーブルが表示される', () => {
    expect(wrapper.html()).toContain('テストユーザー1')
    expect(wrapper.html()).toContain('test1@example.com')
    expect(wrapper.html()).toContain('テストユーザー2')
    expect(wrapper.html()).toContain('test2@example.com')
  })

  it('ロールバッジが正しく表示される', () => {
    expect(wrapper.html()).toContain('ユーザー')
    expect(wrapper.html()).toContain('管理者')
  })

  it('認証状態バッジが正しく表示される', () => {
    expect(wrapper.html()).toContain('認証済み')
    expect(wrapper.html()).toContain('未認証')
  })

  it('編集ボタンと削除ボタンが表示される', () => {
    const editButtons = wrapper.findAll('button:contains("編集")')
    const deleteButtons = wrapper.findAll('button:contains("削除")')
    
    expect(editButtons.length).toBe(2)
    expect(deleteButtons.length).toBe(2)
  })

  it('ロールバッジの色が正しく設定される', () => {
    const component = wrapper.vm
    
    // 管理者は secondary バッジ
    expect(component.getRoleBadgeClass('admin')).toBe('badge-secondary')
    
    // 一般ユーザーは primary バッジ
    expect(component.getRoleBadgeClass('user')).toBe('badge-primary')
  })

  it('認証状態バッジの色が正しく設定される', () => {
    const component = wrapper.vm
    
    // 認証済みは success バッジ
    expect(component.getVerificationBadgeClass(true)).toBe('badge-success')
    
    // 未認証は warning バッジ
    expect(component.getVerificationBadgeClass(false)).toBe('badge-warning')
  })

  it('ユーザーが空の場合のメッセージが表示される', async () => {
    await wrapper.setProps({
      users: { data: [], links: [] },
      filters: { search: '', role: '' },
      role_options: mockRoleOptions
    })

    expect(wrapper.html()).toContain('ユーザーが見つかりませんでした')
  })

  it('編集モーダルが正しく設定される', () => {
    // 編集モーダルの存在確認
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.html()).toContain('ユーザー編集')
  })

  it('削除確認モーダルが正しく設定される', () => {
    // 削除確認モーダルの存在確認
    const modals = wrapper.findAll('dialog')
    expect(modals.length).toBe(2) // 編集モーダルと削除確認モーダル
    expect(wrapper.html()).toContain('ユーザー削除')
  })
})