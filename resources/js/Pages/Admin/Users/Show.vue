<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { useConfirmDialog } from '@/composables/useConfirmDialog';

const props = defineProps({
    user: Object,
});

const { confirmDialog } = useConfirmDialog();

/**
 * Delete user with confirmation
 */
const deleteUser = async () => {
    const confirmed = await confirmDialog(
        `${props.user.name}を削除しますか？`,
        'この操作は取り消せません。'
    );
    
    if (confirmed) {
        router.delete(route('admin.users.destroy', props.user.id));
    }
};

/**
 * Get role label
 */
const getRoleLabel = (role) => {
    const roles = {
        user: 'ユーザー',
        admin: '管理者'
    };
    return roles[role] || role;
};

/**
 * Get role badge class
 */
const getRoleBadgeClass = (role) => {
    return role === 'admin' ? 'badge-error' : 'badge-info';
};
</script>

<template>
    <Head title="ユーザー詳細" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">ユーザー詳細</h2>
                <div class="flex gap-2">
                    <Link :href="route('admin.users.edit', user.id)" class="btn btn-warning">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        編集
                    </Link>
                    <button 
                        @click="deleteUser" 
                        class="btn btn-error"
                        :disabled="user.id === $page.props.auth.user.id"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        削除
                    </button>
                    <Link :href="route('admin.users.index')" class="btn btn-outline">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        戻る
                    </Link>
                </div>
            </div>
        </template>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="card bg-base-100 shadow">
                <div class="card-body">
                    <h2 class="card-title">基本情報</h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="font-semibold text-gray-700">ID</label>
                            <p class="text-gray-900">{{ user.id }}</p>
                        </div>
                        
                        <div>
                            <label class="font-semibold text-gray-700">名前</label>
                            <p class="text-gray-900">{{ user.name }}</p>
                        </div>
                        
                        <div>
                            <label class="font-semibold text-gray-700">メールアドレス</label>
                            <p class="text-gray-900">{{ user.email }}</p>
                        </div>
                        
                        <div>
                            <label class="font-semibold text-gray-700">ロール</label>
                            <div class="mt-1">
                                <div class="badge" :class="getRoleBadgeClass(user.role)">
                                    {{ getRoleLabel(user.role) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Account Status -->
            <div class="card bg-base-100 shadow">
                <div class="card-body">
                    <h2 class="card-title">アカウント状態</h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="font-semibold text-gray-700">認証状態</label>
                            <div class="mt-1">
                                <div v-if="user.email_verified_at" class="badge badge-success">
                                    認証済み
                                </div>
                                <div v-else class="badge badge-warning">
                                    未認証
                                </div>
                            </div>
                            <p v-if="user.email_verified_at" class="text-sm text-gray-600 mt-1">
                                認証日時: {{ new Date(user.email_verified_at).toLocaleString('ja-JP') }}
                            </p>
                        </div>
                        
                        <div>
                            <label class="font-semibold text-gray-700">登録日</label>
                            <p class="text-gray-900">{{ new Date(user.created_at).toLocaleString('ja-JP') }}</p>
                        </div>
                        
                        <div>
                            <label class="font-semibold text-gray-700">最終更新日</label>
                            <p class="text-gray-900">{{ new Date(user.updated_at).toLocaleString('ja-JP') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Warning Message for Self-Delete -->
        <div v-if="user.id === $page.props.auth.user.id" class="alert alert-warning mt-6">
            <svg class="stroke-current shrink-0 w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>これはあなた自身のアカウントです。削除することはできません。</span>
        </div>
    </AdminLayout>
</template>