import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TestCounter from './TestCounter.vue';

describe('TestCounter', () => {
    it('初期状態でカウントが0であることを確認', () => {
        const wrapper = mount(TestCounter);
        expect(wrapper.text()).toContain('現在のカウント: 0');
    });

    it('インクリメントボタンクリックでカウントが1増加することを確認', async () => {
        const wrapper = mount(TestCounter);
        const incrementBtn = wrapper.find('[data-testid="increment-btn"]');
        
        await incrementBtn.trigger('click');
        
        expect(wrapper.text()).toContain('現在のカウント: 1');
    });

    it('デクリメントボタンクリックでカウントが1減少することを確認', async () => {
        const wrapper = mount(TestCounter);
        const decrementBtn = wrapper.find('[data-testid="decrement-btn"]');
        
        await decrementBtn.trigger('click');
        
        expect(wrapper.text()).toContain('現在のカウント: -1');
    });

    it('リセットボタンクリックでカウントが0に戻ることを確認', async () => {
        const wrapper = mount(TestCounter);
        const incrementBtn = wrapper.find('[data-testid="increment-btn"]');
        const resetBtn = wrapper.find('[data-testid="reset-btn"]');
        
        // カウントを増やす
        await incrementBtn.trigger('click');
        await incrementBtn.trigger('click');
        expect(wrapper.text()).toContain('現在のカウント: 2');
        
        // リセット
        await resetBtn.trigger('click');
        expect(wrapper.text()).toContain('現在のカウント: 0');
    });

    it('複数回の操作後に正しいカウント値を表示することを確認', async () => {
        const wrapper = mount(TestCounter);
        const incrementBtn = wrapper.find('[data-testid="increment-btn"]');
        const decrementBtn = wrapper.find('[data-testid="decrement-btn"]');
        
        // +3, -1 = 2
        await incrementBtn.trigger('click');
        await incrementBtn.trigger('click');
        await incrementBtn.trigger('click');
        await decrementBtn.trigger('click');
        
        expect(wrapper.text()).toContain('現在のカウント: 2');
    });

    it('DaisyUIのクラスが正しく適用されていることを確認', () => {
        const wrapper = mount(TestCounter);
        
        expect(wrapper.find('.card').exists()).toBe(true);
        expect(wrapper.find('.btn-primary').exists()).toBe(true);
        expect(wrapper.find('.btn-secondary').exists()).toBe(true);
        expect(wrapper.find('.btn-outline').exists()).toBe(true);
    });
});