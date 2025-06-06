<script setup>
import RootLayout from '@/Layouts/RootLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="ダッシュボード" />

    <RootLayout>
        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <!-- ページヘッダー -->
                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    ダッシュボード
                </h1>
                <div
                    class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                >
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        ログインしました！
                    </div>
                </div>
            </div>
        </div>
    </RootLayout>
</template>
