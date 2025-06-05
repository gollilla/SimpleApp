<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head } from '@inertiajs/vue3';

/**
 * 管理画面ダッシュボード
 * 統計情報と最近のユーザー登録状況を表示
 */

defineProps({
    stats: {
        type: Object,
        required: true
    },
    recent_users: {
        type: Array,
        required: true
    }
});

/**
 * 統計カードの設定
 */
const statCards = [
    {
        title: '総ユーザー数',
        key: 'total_users',
        icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
        bgColor: 'bg-primary'
    },
    {
        title: '管理者数',
        key: 'admin_users', 
        icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        bgColor: 'bg-secondary'
    },
    {
        title: '一般ユーザー数',
        key: 'regular_users',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        bgColor: 'bg-accent'
    },
    {
        title: '認証済みユーザー数',
        key: 'verified_users',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-success'
    }
];

/**
 * ロールバッジの色を取得
 */
const getRoleBadgeClass = (role) => {
    return role === 'admin' ? 'badge-secondary' : 'badge-primary';
};
</script>

<template>
    <Head title="管理画面 - ダッシュボード" />

    <AdminLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                ダッシュボード
            </h2>
        </template>

        <!-- 統計カード -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
                v-for="card in statCards" 
                :key="card.key"
                class="stats shadow"
            >
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <div :class="[card.bgColor, 'w-12 h-12 rounded-full flex items-center justify-center text-white']">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path :d="card.icon" />
                            </svg>
                        </div>
                    </div>
                    <div class="stat-title">{{ card.title }}</div>
                    <div class="stat-value text-primary">{{ stats[card.key] }}</div>
                </div>
            </div>
        </div>

        <!-- 最近登録されたユーザー -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title flex items-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    最近登録されたユーザー
                </h2>
                
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>名前</th>
                                <th>メールアドレス</th>
                                <th>ロール</th>
                                <th>登録日時</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in recent_users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td class="font-medium">{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <div class="badge" :class="getRoleBadgeClass(user.role)">
                                        {{ user.role_label }}
                                    </div>
                                </td>
                                <td class="text-sm text-gray-500">
                                    {{ user.created_at }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- データが無い場合 -->
                    <div v-if="recent_users.length === 0" class="text-center py-8 text-gray-500">
                        まだユーザーが登録されていません
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>