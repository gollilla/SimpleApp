import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Dashboard from './Dashboard.vue';

vi.mock('@/Layouts/AdminLayout.vue', () => ({
  default: {
    template: '<div><slot name="header" /><slot /></div>',
  }
}));

vi.mock('@inertiajs/vue3', () => ({
  Head: {
    template: '<head></head>',
    props: ['title']
  },
  Link: {
    template: '<a><slot /></a>',
    props: ['href']
  },
  route: vi.fn((routeName) => {
    const routes = {
      'admin.users.index': '/admin/users',
      'admin.users.create': '/admin/users/create',
      'dashboard': '/dashboard'
    };
    return routes[routeName] || '/';
  })
}));

describe('Admin Dashboard', () => {
  const mockStats = {
    total_users: 100,
    admin_users: 5,
    active_users: 80
  };

  const mockRoute = vi.fn((routeName) => {
    const routes = {
      'admin.users.index': '/admin/users',
      'admin.users.create': '/admin/users/create',
      'dashboard': '/dashboard'
    };
    return routes[routeName] || '/';
  });

  it('管理ダッシュボードが正しくレンダリングされる', () => {
    const wrapper = mount(Dashboard, {
      props: {
        stats: mockStats
      },
      global: {
        mocks: {
          route: mockRoute
        }
      }
    });

    // タイトルをテスト
    expect(wrapper.text()).toContain('管理ダッシュボード');
    
    // 統計情報をテスト
    expect(wrapper.text()).toContain('総ユーザー数');
    expect(wrapper.text()).toContain('100');
    expect(wrapper.text()).toContain('管理者数');
    expect(wrapper.text()).toContain('5');
    expect(wrapper.text()).toContain('認証済みユーザー数');
    expect(wrapper.text()).toContain('80');
  });

  it('クイックアクションが表示される', () => {
    const wrapper = mount(Dashboard, {
      props: {
        stats: mockStats
      },
      global: {
        mocks: {
          route: mockRoute
        }
      }
    });

    expect(wrapper.text()).toContain('クイックアクション');
    expect(wrapper.text()).toContain('ユーザー一覧');
    expect(wrapper.text()).toContain('ユーザー追加');
    expect(wrapper.text()).toContain('通常画面へ');
  });

  it('統計カードが正しい色で表示される', () => {
    const wrapper = mount(Dashboard, {
      props: {
        stats: mockStats
      },
      global: {
        mocks: {
          route: mockRoute
        }
      }
    });

    // カードのクラスをテスト
    expect(wrapper.find('.card.bg-primary').exists()).toBe(true);
    expect(wrapper.find('.card.bg-secondary').exists()).toBe(true);
    expect(wrapper.find('.card.bg-accent').exists()).toBe(true);
  });
});