<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { useConfirmDialog } from '@/composables/useConfirmDialog';

const props = defineProps({
    users: Object,
    roles: Object,
});

const { confirmDialog } = useConfirmDialog();

/**
 * Delete user with confirmation
 */
const deleteUser = async (user) => {
    const confirmed = await confirmDialog(
        `${user.name}を削除しますか？`,
        'この操作は取り消せません。'
    );
    
    if (confirmed) {
        router.delete(route('admin.users.destroy', user.id));
    }
};

/**
 * Get role label
 */
const getRoleLabel = (role) => {
    return props.roles[role] || role;
};

/**
 * Get role badge class
 */
const getRoleBadgeClass = (role) => {
    return role === 'admin' ? 'badge-error' : 'badge-info';
};
</script>

<template>
    <Head title="ユーザー管理" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">ユーザー管理</h2>
                <Link :href="route('admin.users.create')" class="btn btn-primary">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    ユーザー追加
                </Link>
            </div>
        </template>

        <!-- Users Table -->
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名前</th>
                        <th>メールアドレス</th>
                        <th>ロール</th>
                        <th>認証状態</th>
                        <th>登録日</th>
                        <th>アクション</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users.data" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <div class="badge" :class="getRoleBadgeClass(user.role)">
                                {{ getRoleLabel(user.role) }}
                            </div>
                        </td>
                        <td>
                            <div v-if="user.email_verified_at" class="badge badge-success">認証済み</div>
                            <div v-else class="badge badge-warning">未認証</div>
                        </td>
                        <td>{{ new Date(user.created_at).toLocaleDateString('ja-JP') }}</td>
                        <td>
                            <div class="flex gap-2">
                                <Link :href="route('admin.users.show', user.id)" class="btn btn-sm btn-info">
                                    詳細
                                </Link>
                                <Link :href="route('admin.users.edit', user.id)" class="btn btn-sm btn-warning">
                                    編集
                                </Link>
                                <button 
                                    @click="deleteUser(user)" 
                                    class="btn btn-sm btn-error"
                                    :disabled="user.id === $page.props.auth.user.id"
                                >
                                    削除
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-6" v-if="users.links.length > 3">
            <div class="join">
                <Link 
                    v-for="link in users.links" 
                    :key="link.label"
                    :href="link.url"
                    :class="[
                        'join-item btn',
                        { 'btn-active': link.active },
                        { 'btn-disabled': !link.url }
                    ]"
                >
                    {{ link.label }}
                </Link>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="users.data.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">ユーザーがいません</h3>
            <p class="mt-1 text-sm text-gray-500">まずはユーザーを追加してみましょう。</p>
            <div class="mt-6">
                <Link :href="route('admin.users.create')" class="btn btn-primary">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    最初のユーザーを追加
                </Link>
            </div>
        </div>
    </AdminLayout>
</template>