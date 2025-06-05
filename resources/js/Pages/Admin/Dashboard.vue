<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    stats: Object,
});
</script>

<template>
    <Head title="管理ダッシュボード" />

    <AdminLayout>
        <template #header>
            <h2 class="text-2xl font-bold text-gray-800">管理ダッシュボード</h2>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Total Users Card -->
            <div class="card bg-primary text-primary-content">
                <div class="card-body">
                    <h2 class="card-title">総ユーザー数</h2>
                    <div class="stat-value">{{ stats.total_users }}</div>
                    <div class="card-actions justify-end">
                        <div class="badge badge-secondary">全ユーザー</div>
                    </div>
                </div>
            </div>

            <!-- Admin Users Card -->
            <div class="card bg-secondary text-secondary-content">
                <div class="card-body">
                    <h2 class="card-title">管理者数</h2>
                    <div class="stat-value">{{ stats.admin_users }}</div>
                    <div class="card-actions justify-end">
                        <div class="badge badge-primary">管理者</div>
                    </div>
                </div>
            </div>

            <!-- Active Users Card -->
            <div class="card bg-accent text-accent-content">
                <div class="card-body">
                    <h2 class="card-title">認証済みユーザー数</h2>
                    <div class="stat-value">{{ stats.active_users }}</div>
                    <div class="card-actions justify-end">
                        <div class="badge badge-success">認証済み</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="mt-8">
            <h3 class="text-xl font-bold mb-4">クイックアクション</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link :href="route('admin.users.index')" class="btn btn-outline btn-primary">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                    ユーザー一覧
                </Link>
                
                <Link :href="route('admin.users.create')" class="btn btn-outline btn-secondary">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                    ユーザー追加
                </Link>

                <Link :href="route('dashboard')" class="btn btn-outline btn-accent">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0h3m0 0h3m-6 0V10"></path>
                    </svg>
                    通常画面へ
                </Link>
            </div>
        </div>
    </AdminLayout>
</template>