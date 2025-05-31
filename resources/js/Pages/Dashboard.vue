<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { useConfirmDialog } from '@/composables/useConfirmDialog';

const { confirm } = useConfirmDialog();

const handleDeleteAction = async () => {
    try {
        const result = await confirm({
            title: '削除確認',
            message: 'この操作を実行すると、データが削除されます。本当に実行しますか？',
            acceptLabel: '削除する',
            rejectLabel: 'キャンセル'
        });
        
        if (result) {
            alert('削除が実行されました');
        }
    } catch (rejected) {
        alert('削除がキャンセルされました');
    }
};

const handleSimpleConfirm = async () => {
    try {
        await confirm();
        alert('受け入れられました');
    } catch (rejected) {
        alert('拒否されました');
    }
};
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2
                class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200"
            >
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                >
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <h3 class="text-lg font-semibold mb-4">You're logged in!</h3>
                        
                        <div class="space-y-4">
                            <h4 class="text-md font-medium">確認ダイアログのテスト</h4>
                            <div class="space-x-4">
                                <button
                                    @click="handleSimpleConfirm"
                                    class="btn btn-primary"
                                >
                                    デフォルト確認ダイアログ
                                </button>
                                
                                <button
                                    @click="handleDeleteAction"
                                    class="btn btn-error"
                                >
                                    削除確認ダイアログ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
