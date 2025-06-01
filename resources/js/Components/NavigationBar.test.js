import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationBar from './NavigationBar.vue';

describe('NavigationBar', () => {
    it('デフォルトのブランドロゴが表示される', () => {
        const wrapper = mount(NavigationBar);
        
        expect(wrapper.text()).toContain('ブランド名');
    });

    it('propsで渡されたブランドロゴが表示される', () => {
        const brandLogo = 'テストブランド';
        const wrapper = mount(NavigationBar, {
            props: {
                brandLogo
            }
        });
        
        expect(wrapper.text()).toContain(brandLogo);
    });

    it('メニューボタンが存在する', () => {
        const wrapper = mount(NavigationBar);
        
        const menuButton = wrapper.find('[data-testid="menu-button"]');
        expect(menuButton.exists()).toBe(true);
    });

    it('メニュー項目が存在する', () => {
        const wrapper = mount(NavigationBar);
        
        const menuItems = wrapper.find('[data-testid="menu-items"]');
        expect(menuItems.exists()).toBe(true);
    });

    it('デフォルトのメニュー項目が表示される', () => {
        const wrapper = mount(NavigationBar);
        
        const menuText = wrapper.text();
        expect(menuText).toContain('メニュー項目 1');
        expect(menuText).toContain('メニュー項目 2');
        expect(menuText).toContain('メニュー項目 3');
    });


    it('正しいDaisyUIクラスが適用されている', () => {
        const wrapper = mount(NavigationBar);
        
        expect(wrapper.find('.navbar').exists()).toBe(true);
        expect(wrapper.find('.navbar-start').exists()).toBe(true);
        expect(wrapper.find('.navbar-end').exists()).toBe(true);
        expect(wrapper.find('.dropdown').exists()).toBe(true);
        expect(wrapper.find('.btn-ghost').exists()).toBe(true);
    });
});