<script setup>
import RootLayout from '@/Layouts/RootLayout.vue';
import NavigationBar from '@/Components/NavigationBar.vue';
import { Head } from '@inertiajs/vue3';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';
import { useInertiaProps } from '@/composables/useInertiaProps';
import { ref } from 'vue';

const { showConfirmDialog } = useConfirmDialog()
const { user, enums, getEnum, getUserStatusOptions } = useInertiaProps()

const selectedStatus = ref('')

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
                            
                            <section>
                                <h2 class="text-lg font-semibold mb-4">Inertia Props & Enums</h2>
                                <p class="text-gray-600 dark:text-gray-400 mb-4">
                                    HandleInertiaRequestsミドルウェアから共有されるデータの型安全な使用例です。
                                </p>
                                
                                <div class="space-y-6">
                                    <!-- ユーザー情報表示 -->
                                    <div class="card bg-base-100 shadow">
                                        <div class="card-body">
                                            <h3 class="card-title">認証情報</h3>
                                            <div v-if="user">
                                                <p><strong>名前:</strong> {{ user.name }}</p>
                                                <p><strong>メール:</strong> {{ user.email }}</p>
                                                <p><strong>認証済み:</strong> {{ user.email_verified_at ? '済み' : '未認証' }}</p>
                                            </div>
                                            <div v-else>
                                                <p>ログインしていません</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Enum表示 -->
                                    <div class="card bg-base-100 shadow">
                                        <div class="card-body">
                                            <h3 class="card-title">Enum データ</h3>
                                            <div class="space-y-4">
                                                <div>
                                                    <h4 class="font-semibold mb-2">UserStatus Enum:</h4>
                                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        <div 
                                                            v-for="status in getEnum('UserStatus')" 
                                                            :key="status.value"
                                                            class="flex justify-between p-2 bg-base-200 rounded"
                                                        >
                                                            <span class="font-mono text-sm">{{ status.value }}</span>
                                                            <span>{{ status.label }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h4 class="font-semibold mb-2">セレクトボックス例:</h4>
                                                    <select 
                                                        v-model="selectedStatus" 
                                                        class="select select-bordered w-full max-w-xs"
                                                    >
                                                        <option value="">ステータスを選択</option>
                                                        <option 
                                                            v-for="option in getUserStatusOptions()" 
                                                            :key="option.value" 
                                                            :value="option.value"
                                                        >
                                                            {{ option.label }}
                                                        </option>
                                                    </select>
                                                    <p v-if="selectedStatus" class="mt-2 text-sm">
                                                        選択値: <code class="bg-base-200 px-2 py-1 rounded">{{ selectedStatus }}</code>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Raw Enums Data -->
                                    <div class="card bg-base-100 shadow">
                                        <div class="card-body">
                                            <h3 class="card-title">生データ (開発用)</h3>
                                            <div class="mockup-code">
                                                <pre><code>{{ JSON.stringify(enums, null, 2) }}</code></pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </RootLayout>
</template>