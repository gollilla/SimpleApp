<script setup>
import { computed } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'
import UserStatusBadge from '@/Components/Admin/UserStatusBadge.vue'

/**
 * ユーザー詳細ページ
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** ユーザー情報 */
  user: {
    type: Object,
    required: true
  }
})

/**
 * 共有Enumデータを取得
 */
const { enums } = usePage().props

/**
 * ロールのラベル取得
 */
const getRoleLabel = (role) => {
  // valueで検索してマッチするEnumを探す
  const roleEnum = Object.values(enums.UserRole || {}).find(r => r.value === role)
  return roleEnum?.label || role
}

/**
 * ステータスのラベル取得
 */
const getStatusLabel = (status) => {
  // valueで検索してマッチするEnumを探す
  const statusEnum = Object.values(enums.UserStatus || {}).find(s => s.value === status)
  return statusEnum?.label || status
}

/**
 * 日付フォーマット
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('ja-JP')
}

/**
 * 最後のログイン表示
 */
const lastLogin = computed(() => {
  // 実際の実装では last_login_at フィールドを使用
  return props.user.updated_at ? formatDate(props.user.updated_at) : '未ログイン'
})

/**
 * アカウント状態
 */
const accountSummary = computed(() => {
  const createdDays = Math.floor((new Date() - new Date(props.user.created_at)) / (1000 * 60 * 60 * 24))
  return {
    daysActive: createdDays,
    emailVerified: props.user.email_verified_at !== null
  }
})
</script>

<template>
  <RootLayout>
    <Head :title="`管理画面 - ${user.name} の詳細`" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li><Link :href="route('admin.users.index')">ユーザー管理</Link></li>
            <li>{{ user.name }}</li>
          </ul>
        </div>
        <div class="flex justify-between items-start mt-2">
          <div>
            <h1 class="text-3xl font-bold text-base-content">{{ user.name }}</h1>
            <p class="text-base-content/70 mt-2">ユーザーID: {{ user.id }}</p>
          </div>
          <div class="flex space-x-2">
            <Link 
              :href="route('admin.users.edit', user.id)" 
              class="btn btn-primary btn-sm"
            >
              編集
            </Link>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 基本情報 -->
        <div class="lg:col-span-2 space-y-6">
          <!-- ユーザー基本情報 -->
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title mb-4">
                <span class="mr-2">👤</span>
                基本情報
              </h2>
              
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- 名前 -->
                  <div>
                    <label class="text-sm font-medium text-base-content/70">名前</label>
                    <div class="text-lg font-semibold">{{ user.name }}</div>
                  </div>

                  <!-- メールアドレス -->
                  <div>
                    <label class="text-sm font-medium text-base-content/70">メールアドレス</label>
                    <div class="text-lg">{{ user.email }}</div>
                  </div>

                  <!-- ロール -->
                  <div>
                    <label class="text-sm font-medium text-base-content/70">ロール</label>
                    <div class="flex items-center space-x-2">
                      <div class="badge badge-outline">{{ getRoleLabel(user.role) }}</div>
                    </div>
                  </div>

                  <!-- ステータス -->
                  <div>
                    <label class="text-sm font-medium text-base-content/70">ステータス</label>
                    <UserStatusBadge 
                      :status="user.status" 
                      :label="getStatusLabel(user.status)"
                    />
                  </div>
                </div>

                <!-- メール認証状態 -->
                <div>
                  <label class="text-sm font-medium text-base-content/70">メール認証</label>
                  <div class="flex items-center space-x-2">
                    <div v-if="accountSummary.emailVerified" class="badge badge-success">
                      ✓ 認証済み
                    </div>
                    <div v-else class="badge badge-warning">
                      ⚠ 未認証
                    </div>
                    <span v-if="user.email_verified_at" class="text-sm text-base-content/70">
                      {{ formatDate(user.email_verified_at) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- アカウント履歴 -->
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title mb-4">
                <span class="mr-2">📅</span>
                アカウント履歴
              </h2>
              
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- 登録日 -->
                  <div>
                    <label class="text-sm font-medium text-base-content/70">登録日</label>
                    <div class="text-lg">{{ formatDate(user.created_at) }}</div>
                    <div class="text-sm text-base-content/70">{{ accountSummary.daysActive }}日前</div>
                  </div>

                  <!-- 最終更新 -->
                  <div>
                    <label class="text-sm font-medium text-base-content/70">最終更新</label>
                    <div class="text-lg">{{ formatDate(user.updated_at) }}</div>
                  </div>

                  <!-- 最後のログイン -->
                  <div>
                    <label class="text-sm font-medium text-base-content/70">最後のログイン</label>
                    <div class="text-lg">{{ lastLogin }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- サイドバー -->
        <div class="space-y-6">
          <!-- クイックアクション -->
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title mb-4">クイックアクション</h2>
              
              <div class="space-y-3">
                <Link 
                  :href="route('admin.users.edit', user.id)" 
                  class="btn btn-primary w-full justify-start"
                >
                  <span class="mr-2">✏️</span>
                  ユーザー情報を編集
                </Link>
                
                <button class="btn btn-outline w-full justify-start">
                  <span class="mr-2">📧</span>
                  メール送信
                </button>
                
                <button class="btn btn-outline w-full justify-start">
                  <span class="mr-2">🔄</span>
                  パスワードリセット
                </button>
                
                <div class="divider"></div>
                
                <button class="btn btn-error btn-outline w-full justify-start">
                  <span class="mr-2">🗑️</span>
                  アカウント削除
                </button>
              </div>
            </div>
          </div>

          <!-- ユーザー統計 -->
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title mb-4">ユーザー統計</h2>
              
              <div class="space-y-3">
                <div class="stat">
                  <div class="stat-title">アカウント歴</div>
                  <div class="stat-value text-2xl">{{ accountSummary.daysActive }}</div>
                  <div class="stat-desc">日</div>
                </div>
                
                <div class="stat">
                  <div class="stat-title">ログイン回数</div>
                  <div class="stat-value text-2xl">-</div>
                  <div class="stat-desc">回（未実装）</div>
                </div>
                
                <div class="stat">
                  <div class="stat-title">最終活動</div>
                  <div class="stat-value text-lg">今日</div>
                  <div class="stat-desc">（推定）</div>
                </div>
              </div>
            </div>
          </div>

          <!-- システム情報 -->
          <div class="card bg-warning/10 border border-warning/20 shadow">
            <div class="card-body">
              <h2 class="card-title text-warning mb-4">
                <span class="mr-2">⚠️</span>
                注意事項
              </h2>
              
              <div class="text-sm space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-warning rounded-full"></div>
                  <span>ユーザー削除は取り消せません</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-info rounded-full"></div>
                  <span>権限変更は即座に反映されます</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-success rounded-full"></div>
                  <span>変更履歴は記録されます</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ナビゲーション -->
      <div class="mt-8 flex justify-between">
        <Link 
          :href="route('admin.users.index')" 
          class="btn btn-outline"
        >
          ← ユーザー一覧に戻る
        </Link>
        
        <Link 
          :href="route('admin.users.edit', user.id)" 
          class="btn btn-primary"
        >
          編集画面へ →
        </Link>
      </div>
    </div>
  </RootLayout>
</template>