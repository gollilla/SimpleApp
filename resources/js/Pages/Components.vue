<script setup>
import RootLayout from '@/Layouts/RootLayout.vue';
import NavigationBar from '@/Components/NavigationBar.vue';
import SearchInput from '@/Components/Admin/SearchInput.vue';
import StatusSelector from '@/Components/Admin/StatusSelector.vue';
import UserStatusBadge from '@/Components/Admin/UserStatusBadge.vue';
import { Head } from '@inertiajs/vue3';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';
import { ref } from 'vue';

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

// 管理画面コンポーネントのテスト用データ
const searchValue = ref('')
const selectedStatus = ref('')
const statusOptions = [
  { value: '', label: 'すべて' },
  { value: 'active', label: 'アクティブ' },
  { value: 'inactive', label: '非アクティブ' },
  { value: 'pending', label: '承認待ち' },
  { value: 'suspended', label: '停止中' }
]

const handleSearch = (value) => {
  // デバッグ用: 検索処理のログ出力
  // eslint-disable-next-line no-console, no-undef
  console.log('検索:', value)
}

const handleStatusChange = (value) => {
  // デバッグ用: ステータス変更処理のログ出力
  // eslint-disable-next-line no-console, no-undef
  console.log('ステータス変更:', value)
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
                                <h2 class="text-lg font-semibold mb-4">管理画面コンポーネント</h2>
                                <p class="text-gray-600 dark:text-gray-400 mb-4">
                                    管理画面で使用するコンポーネントのテストです。
                                </p>
                                
                                <div class="space-y-6">
                                    <div>
                                        <h3 class="text-md font-medium mb-2">SearchInput</h3>
                                        <div class="w-full max-w-md">
                                            <SearchInput
                                                v-model="searchValue"
                                                placeholder="ユーザーを検索..."
                                                label="ユーザー検索"
                                                @search="handleSearch"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 class="text-md font-medium mb-2">StatusSelector</h3>
                                        <div class="w-full max-w-md">
                                            <StatusSelector
                                                v-model="selectedStatus"
                                                :options="statusOptions"
                                                label="ステータス選択"
                                                @change="handleStatusChange"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 class="text-md font-medium mb-2">UserStatusBadge</h3>
                                        <div class="flex flex-wrap gap-2">
                                            <UserStatusBadge status="active" label="アクティブ" />
                                            <UserStatusBadge status="inactive" label="非アクティブ" />
                                            <UserStatusBadge status="pending" label="承認待ち" />
                                            <UserStatusBadge status="suspended" label="停止中" />
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
