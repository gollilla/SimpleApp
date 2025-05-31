<script setup>
import RootLayout from '@/Layouts/RootLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="コンポーネント確認" />

    <RootLayout>
        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <h1 class="text-2xl font-bold mb-6">コンポーネント確認ページ</h1>
                        
                        <div class="space-y-8">
                            <section>
                                <h2 class="text-lg font-semibold mb-4">RootLayout</h2>
                                <p class="text-gray-600 dark:text-gray-400">
                                    このページはRootLayoutコンポーネントを使用しています。
                                    全ページ共通の最上位レイアウトとして機能し、メイン部分をスロットで受け入れます。
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </RootLayout>
</template>