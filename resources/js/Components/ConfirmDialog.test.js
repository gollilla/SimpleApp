import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfirmDialog from './ConfirmDialog.vue';

// HTMLDialogElement のメソッドをモック
beforeEach(() => {
    global.HTMLDialogElement.prototype.showModal = vi.fn();
    global.HTMLDialogElement.prototype.close = vi.fn();
});

describe('ConfirmDialog', () => {
    const defaultProps = {
        show: true,
        message: 'テストメッセージ',
    };

    it('初期状態で正しくレンダリングされることを確認', () => {
        const wrapper = mount(ConfirmDialog, {
            props: defaultProps,
        });

        expect(wrapper.text()).toContain('確認');
        expect(wrapper.text()).toContain('テストメッセージ');
        expect(wrapper.text()).toContain('受け入れる');
        expect(wrapper.text()).toContain('拒否する');
    });

    it('カスタムプロパティが正しく表示されることを確認', () => {
        const wrapper = mount(ConfirmDialog, {
            props: {
                ...defaultProps,
                title: 'カスタムタイトル',
                confirmLabel: 'はい',
                cancelLabel: 'いいえ',
            },
        });

        expect(wrapper.text()).toContain('カスタムタイトル');
        expect(wrapper.text()).toContain('はい');
        expect(wrapper.text()).toContain('いいえ');
    });

    it('確認ボタンクリックでconfirmイベントが発火されることを確認', async () => {
        const wrapper = mount(ConfirmDialog, {
            props: defaultProps,
        });

        const confirmBtn = wrapper.find('[data-testid="confirm-btn"]');
        await confirmBtn.trigger('click');

        expect(wrapper.emitted('confirm')).toBeTruthy();
        expect(wrapper.emitted('confirm')).toHaveLength(1);
    });

    it('キャンセルボタンクリックでcancelイベントが発火されることを確認', async () => {
        const wrapper = mount(ConfirmDialog, {
            props: defaultProps,
        });

        const cancelBtn = wrapper.find('[data-testid="cancel-btn"]');
        await cancelBtn.trigger('click');

        expect(wrapper.emitted('cancel')).toBeTruthy();
        expect(wrapper.emitted('cancel')).toHaveLength(1);
    });

    it('ESCキー押下でcancelイベントが発火されることを確認', async () => {
        const wrapper = mount(ConfirmDialog, {
            props: defaultProps,
            attachTo: document.body,
        });

        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('cancel')).toBeTruthy();
        expect(wrapper.emitted('cancel')).toHaveLength(1);

        wrapper.unmount();
    });

    it('DaisyUIのクラスが正しく適用されていることを確認', () => {
        const wrapper = mount(ConfirmDialog, {
            props: defaultProps,
        });

        expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.find('.modal-box').exists()).toBe(true);
        expect(wrapper.find('.modal-action').exists()).toBe(true);
        expect(wrapper.find('.btn-primary').exists()).toBe(true);
        expect(wrapper.find('.btn-outline').exists()).toBe(true);
    });

    it('showプロパティの変更でダイアログの表示状態が変わることを確認', async () => {
        const wrapper = mount(ConfirmDialog, {
            props: {
                ...defaultProps,
                show: false,
            },
        });

        // showプロパティをtrueに変更
        await wrapper.setProps({ show: true });
        expect(global.HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

        // showプロパティをfalseに変更
        await wrapper.setProps({ show: false });
        expect(global.HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });
});