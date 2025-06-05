import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationBar from './NavigationBar.vue';

// routeヘルパーをモック
const mockRoute = vi.fn((name) => `/${name.replace('.', '/')}`)

// Linkコンポーネントをモック
const MockLink = {
  name: 'Link',
  props: ['href', 'method', 'as'],
  template: '<a :href="href"><slot /></a>'
}

describe('NavigationBar', () => {
    it('デフォルトのブランドロゴが表示される', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                },
                components: {
                    Link: MockLink
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
                },
                components: {
                    Link: MockLink
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
                },
                components: {
                    Link: MockLink
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
                },
                components: {
                    Link: MockLink
                }
            }
        });
        
        const menuItems = wrapper.find('[data-testid="menu-items"]');
        expect(menuItems.exists()).toBe(true);
    });

    it('デフォルトのメニュー項目が表示される', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                },
                components: {
                    Link: MockLink
                }
            }
        });
        
        const menuText = wrapper.text();
        expect(menuText).toContain('ダッシュボード');
        expect(menuText).toContain('ユーザー管理');
        expect(menuText).toContain('システム設定');
    });


    it('正しいDaisyUIクラスが適用されている', () => {
        const wrapper = mount(NavigationBar, {
            global: {
                mocks: {
                    route: mockRoute
                },
                components: {
                    Link: MockLink
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