<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: '確認',
    },
    message: {
        type: String,
        required: true,
    },
    confirmLabel: {
        type: String,
        default: '受け入れる',
    },
    cancelLabel: {
        type: String,
        default: '拒否する',
    },
});

const emit = defineEmits(['confirm', 'cancel']);

const dialog = ref();

watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            dialog.value?.showModal();
        } else {
            dialog.value?.close();
        }
    },
);

const handleConfirm = () => {
    emit('confirm');
    if (dialog.value?.close) {
        dialog.value.close();
    }
};

const handleCancel = () => {
    emit('cancel');
    if (dialog.value?.close) {
        dialog.value.close();
    }
};

const handleEscape = (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
    }
};

const handleDialogClick = (e) => {
    if (e.target === dialog.value) {
        handleCancel();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
    <dialog 
        ref="dialog" 
        class="modal" 
        @click="handleDialogClick"
    >
        <div class="modal-box">
            <h3 class="text-lg font-bold">{{ title }}</h3>
            <p class="py-4">{{ message }}</p>
            <div class="modal-action">
                <button 
                    class="btn btn-primary" 
                    @click="handleConfirm"
                    data-testid="confirm-btn"
                >
                    {{ confirmLabel }}
                </button>
                <button 
                    class="btn btn-outline" 
                    @click="handleCancel"
                    data-testid="cancel-btn"
                >
                    {{ cancelLabel }}
                </button>
            </div>
        </div>
    </dialog>
</template>