import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationBar from './NavigationBar.vue';

// routeヘルパーをモック
const mockRoute = vi.fn((name) => `/${name.replace('.', '/')}`)

// usePageのモックデータ
let mockPageData = {
    props: {
        auth: {
            user: {
                id: 1,
                name: 'Test User',
                email: 'test@example.com',
                role: 'user'
            }
        }
    }
}

// Inertia.jsのモック
vi.mock('@inertiajs/vue3', () => ({
    Link: {
        name: 'Link',
        props: ['href', 'method', 'as'],
        template: '<a :href="href"><slot /></a>'
    },
    usePage: vi.fn(() => mockPageData)
}))

describe('NavigationBar', () => {
    beforeEach(() => {
        // 各テストの前にデフォルトのユーザーデータをリセット
        mockPageData = {
            props: {
                auth: {
                    user: {
                        id: 1,
                        name: 'Test User',
                        email: 'test@example.com',
                        role: 'user'
                    }
                }
            }
        }
    })

    it('デフォルトのブランドロゴが表示される', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        expect(wrapper.text()).toContain('SimpleApp');
    });

    it('propsで渡されたブランドロゴが表示される', () => {
        const brandLogo = 'テストブランド';
        const wrapper = mount(NavigationBar, {
            props: {
                brandLogo
            },
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        expect(wrapper.text()).toContain(brandLogo);
    });

    it('メニューボタンが存在する', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        const menuButton = wrapper.find('[data-testid="menu-button"]');
        expect(menuButton.exists()).toBe(true);
    });

    it('メニュー項目が存在する', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        const menuItems = wrapper.find('[data-testid="menu-items"]');
        expect(menuItems.exists()).toBe(true);
    });

    it('管理者用のメニュー項目が表示される', () => {
        // 管理者用のデータを設定
        mockPageData.props.auth.user.role = 'admin';

        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        const menuText = wrapper.text();
        expect(menuText).toContain('ダッシュボード');
        expect(menuText).toContain('ユーザー管理');
        expect(menuText).toContain('システム設定');
        expect(menuText).toContain('ユーザーレポート');
        expect(menuText).toContain('システムレポート');
    });

    it('一般ユーザー用のメニュー項目が表示される', () => {
        // 一般ユーザー用のデータを設定
        mockPageData.props.auth.user.role = 'user';

        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        const menuText = wrapper.text();
        expect(menuText).toContain('ダッシュボード');
        expect(menuText).toContain('マイページ');
        expect(menuText).not.toContain('ユーザー管理');
        expect(menuText).not.toContain('システム設定');
    });

    it('共通メニュー項目が表示される', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        const menuText = wrapper.text();
        expect(menuText).toContain('プロフィール');
        expect(menuText).toContain('ログアウト');
    });

    it('正しいDaisyUIクラスが適用されている', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                }
            }
        });
        
        expect(wrapper.find('.navbar').exists()).toBe(true);
        expect(wrapper.find('.navbar-start').exists()).toBe(true);
        expect(wrapper.find('.navbar-end').exists()).toBe(true);
        expect(wrapper.find('.dropdown').exists()).toBe(true);
        expect(wrapper.find('.btn-ghost').exists()).toBe(true);
    });
});