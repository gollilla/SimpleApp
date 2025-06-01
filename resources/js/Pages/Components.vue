<script setup>
import RootLayout from '@/Layouts/RootLayout.vue';
import NavigationBar from '@/Components/NavigationBar.vue';
import { Head } from '@inertiajs/vue3';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

const { showConfirmDialog } = useConfirmDialog()

const handleTestDialog = async () => {
  const result = await showConfirmDialog({
    title: 'テスト確認',
    message: 'このダイアログはテスト用です。操作を続行しますか？',
    acceptLabel: '続行する',
    rejectLabel: 'キャンセル'
  })
  
  if (result) {
    alert('受け入れられました')
  } else {
    alert('拒否されました')
  }
}
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
                                <h2 class="text-lg font-semibold mb-4">NavigationBar</h2>
                                <p class="text-gray-600 dark:text-gray-400 mb-4">
                                    DaisyUIを使用したナビゲーションバーコンポーネントです。
                                    ブランドロゴをpropsで設定でき、右側に固定のメニューボタンがあります。
                                </p>
                                <div class="border rounded-lg p-4 bg-base-100">
                                    <NavigationBar brand-logo="サンプルブランド" />
                                </div>
                                <div class="mt-4 border rounded-lg p-4 bg-base-100">
                                    <NavigationBar brand-logo="カスタムブランド" />
                                </div>
                            </section>
                            
                            <section>
                                <h2 class="text-lg font-semibold mb-4">RootLayout</h2>
                                <p class="text-gray-600 dark:text-gray-400">
                                    このページはRootLayoutコンポーネントを使用しています。
                                    全ページ共通の最上位レイアウトとして機能し、メイン部分をスロットで受け入れます。
                                </p>
                            </section>
                            
                            <section>
                                <h2 class="text-lg font-semibold mb-4">ConfirmDialog</h2>
                                <p class="text-gray-600 dark:text-gray-400 mb-4">
                                    確認ダイアログコンポーネントのテストです。
                                </p>
                                <button 
                                    class="btn btn-primary"
                                    @click="handleTestDialog"
                                >
                                    確認ダイアログをテスト
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </RootLayout>
</template>