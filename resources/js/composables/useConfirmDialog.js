import { ref } from 'vue';

export function useConfirmDialog() {
    const isOpen = ref(false);
    const currentResolve = ref(null);
    const dialogProps = ref({
        title: '確認',
        message: '',
        confirmLabel: '受け入れる',
        cancelLabel: '拒否する',
    });

    const showConfirmDialog = (options = {}) => {
        return new Promise((resolve) => {
            dialogProps.value = {
                title: options.title || '確認',
                message: options.message || '',
                confirmLabel: options.confirmLabel || '受け入れる',
                cancelLabel: options.cancelLabel || '拒否する',
            };
            
            currentResolve.value = resolve;
            isOpen.value = true;
        });
    };

    const handleConfirm = () => {
        if (currentResolve.value) {
            currentResolve.value(true);
            currentResolve.value = null;
        }
        isOpen.value = false;
    };

    const handleCancel = () => {
        if (currentResolve.value) {
            currentResolve.value(false);
            currentResolve.value = null;
        }
        isOpen.value = false;
    };

    return {
        isOpen,
        dialogProps,
        showConfirmDialog,
        handleConfirm,
        handleCancel,
    };
}