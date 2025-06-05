import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createInertiaApp } from '@inertiajs/vue3'
import AdminLayout from './AdminLayout.vue'

/**
 * AdminLayoutコンポーネントのテスト
 */

// Inertiaのモック
vi.mock('@inertiajs/vue3', () => ({
  Link: {
    name: 'Link',
    props: ['href', 'method', 'as'],
    template: '<a :href="href"><slot /></a>'
  },
  usePage: () => ({
    props: {
      auth: {
        user: {
          id: 1,
          name: 'テストユーザー',
          email: 'test@example.com',
          is_admin: true
        }
      }
    }
  })
}))

// Routeのモック
global.route = vi.fn((name) => `/${name.replace('.', '/')}`)

describe('AdminLayout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AdminLayout, {
      slots: {
        header: '<h1>テストヘッダー</h1>',
        default: '<div>テストコンテンツ</div>'
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

  it('ヘッダースロットが表示される', () => {
    expect(wrapper.html()).toContain('テストヘッダー')
  })

  it('デフォルトスロットが表示される', () => {
    expect(wrapper.html()).toContain('テストコンテンツ')
  })

  it('ナビゲーションにロゴと管理画面タイトルが表示される', () => {
    expect(wrapper.html()).toContain('管理画面')
  })

  it('サイドバーメニューが表示される', () => {
    expect(wrapper.html()).toContain('ダッシュボード')
    expect(wrapper.html()).toContain('ユーザー管理')
  })

  it('ユーザーメニューが表示される', () => {
    expect(wrapper.html()).toContain('テストユーザー')
    expect(wrapper.html()).toContain('一般画面に戻る')
    expect(wrapper.html()).toContain('プロフィール')
    expect(wrapper.html()).toContain('ログアウト')
  })

  it('サイドバートグルが動作する', async () => {
    const toggleButton = wrapper.find('label.btn-ghost')
    
    // 初期状態ではサイドバーは閉じている
    expect(wrapper.vm.sidebarOpen).toBe(false)
    
    // トグルボタンをクリック
    await toggleButton.trigger('click')
    
    // サイドバーが開く
    expect(wrapper.vm.sidebarOpen).toBe(true)
  })
})