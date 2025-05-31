import { describe, it, expect } from 'vitest';
import { useConfirmDialog } from './useConfirmDialog.js';

describe('useConfirmDialog', () => {
    it('初期状態が正しく設定されることを確認', () => {
        const { isOpen, dialogProps } = useConfirmDialog();

        expect(isOpen.value).toBe(false);
        expect(dialogProps.value).toEqual({
            title: '確認',
            message: '',
            confirmLabel: '受け入れる',
            cancelLabel: '拒否する',
        });
    });

    it('showConfirmDialogでダイアログが開かれることを確認', async () => {
        const { isOpen, dialogProps, showConfirmDialog } = useConfirmDialog();

        const promise = showConfirmDialog({
            message: 'テストメッセージ',
            title: 'テストタイトル',
        });

        expect(isOpen.value).toBe(true);
        expect(dialogProps.value.message).toBe('テストメッセージ');
        expect(dialogProps.value.title).toBe('テストタイトル');

        expect(promise).toBeInstanceOf(Promise);
    });

    it('handleConfirmでtrueが返されダイアログが閉じられることを確認', async () => {
        const { isOpen, showConfirmDialog, handleConfirm } = useConfirmDialog();

        const promise = showConfirmDialog({
            message: 'テストメッセージ',
        });

        expect(isOpen.value).toBe(true);

        handleConfirm();

        const result = await promise;
        expect(result).toBe(true);
        expect(isOpen.value).toBe(false);
    });

    it('handleCancelでfalseが返されダイアログが閉じられることを確認', async () => {
        const { isOpen, showConfirmDialog, handleCancel } = useConfirmDialog();

        const promise = showConfirmDialog({
            message: 'テストメッセージ',
        });

        expect(isOpen.value).toBe(true);

        handleCancel();

        const result = await promise;
        expect(result).toBe(false);
        expect(isOpen.value).toBe(false);
    });

    it('カスタムラベルが正しく設定されることを確認', () => {
        const { dialogProps, showConfirmDialog } = useConfirmDialog();

        showConfirmDialog({
            message: 'テストメッセージ',
            confirmLabel: 'はい',
            cancelLabel: 'いいえ',
        });

        expect(dialogProps.value.confirmLabel).toBe('はい');
        expect(dialogProps.value.cancelLabel).toBe('いいえ');
    });

    it('デフォルト値が正しく適用されることを確認', () => {
        const { dialogProps, showConfirmDialog } = useConfirmDialog();

        showConfirmDialog({
            message: 'テストメッセージ',
        });

        expect(dialogProps.value.title).toBe('確認');
        expect(dialogProps.value.confirmLabel).toBe('受け入れる');
        expect(dialogProps.value.cancelLabel).toBe('拒否する');
    });
});