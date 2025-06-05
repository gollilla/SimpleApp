<script setup>
import { computed } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'
import UserStatusBadge from '@/Components/Admin/UserStatusBadge.vue'

/**
 * 管理画面ダッシュボードページ
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** ユーザー統計データ */
  userStats: {
    type: Object,
    required: true
  },
  /** 最近登録されたユーザー */
  recentUsers: {
    type: Array,
    required: true
  }
})

/**
 * ユーザー統計の活用率を計算
 */
const activeUserRate = computed(() => {
  if (props.userStats.total === 0) return 0
  return Math.round((props.userStats.active / props.userStats.total) * 100)
})

/**
 * 日付フォーマット関数
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ja-JP')
}

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
</script>

<template>
  <RootLayout>
    <Head title="管理画面 - ダッシュボード" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li>ダッシュボード</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">管理画面ダッシュボード</h1>
        <p class="text-base-content/70 mt-2">システムの概要と最新の活動状況</p>
      </div>

      <!-- 統計カード -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- 総ユーザー数 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-base-content/70">総ユーザー数</p>
                <p class="text-2xl font-bold text-primary">{{ userStats.total.toLocaleString() }}</p>
              </div>
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-12">
                  <span class="text-xl">👥</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- アクティブユーザー -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-base-content/70">アクティブユーザー</p>
                <p class="text-2xl font-bold text-success">{{ userStats.active.toLocaleString() }}</p>
                <p class="text-xs text-base-content/50">{{ activeUserRate }}%</p>
              </div>
              <div class="avatar placeholder">
                <div class="bg-success text-success-content rounded-full w-12">
                  <span class="text-xl">✅</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 承認待ちユーザー -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-base-content/70">承認待ち</p>
                <p class="text-2xl font-bold text-warning">{{ userStats.pending.toLocaleString() }}</p>
              </div>
              <div class="avatar placeholder">
                <div class="bg-warning text-warning-content rounded-full w-12">
                  <span class="text-xl">⏳</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 停止中ユーザー -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-base-content/70">停止中</p>
                <p class="text-2xl font-bold text-error">{{ userStats.suspended.toLocaleString() }}</p>
              </div>
              <div class="avatar placeholder">
                <div class="bg-error text-error-content rounded-full w-12">
                  <span class="text-xl">🚫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- 最近のユーザー -->
        <div class="lg:col-span-2">
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <div class="flex justify-between items-center mb-4">
                <h2 class="card-title">最近登録されたユーザー</h2>
                <Link 
                  :href="route('admin.users.index')" 
                  class="btn btn-sm btn-primary"
                >
                  すべて表示
                </Link>
              </div>
              
              <div class="overflow-x-auto">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>名前</th>
                      <th>メール</th>
                      <th>ロール</th>
                      <th>ステータス</th>
                      <th>登録日</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in recentUsers" :key="user.id">
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>
                        <div class="badge badge-outline whitespace-nowrap">{{ getRoleLabel(user.role) }}</div>
                      </td>
                      <td>
                        <UserStatusBadge 
                          :status="user.status" 
                          :label="getStatusLabel(user.status)"
                        />
                      </td>
                      <td>{{ formatDate(user.created_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- クイックアクション -->
        <div>
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title mb-4">クイックアクション</h2>
              
              <div class="space-y-3">
                <Link 
                  :href="route('admin.users.create')" 
                  class="btn btn-primary w-full justify-start"
                >
                  <span class="mr-2">👤</span>
                  新規ユーザー作成
                </Link>
                
                <Link 
                  :href="route('admin.users.index')" 
                  class="btn btn-outline w-full justify-start"
                >
                  <span class="mr-2">📋</span>
                  ユーザー管理
                </Link>
                
                <Link 
                  :href="route('admin.settings.index')" 
                  class="btn btn-outline w-full justify-start"
                >
                  <span class="mr-2">⚙️</span>
                  システム設定
                </Link>
                
                <Link 
                  :href="route('admin.reports.users')" 
                  class="btn btn-outline w-full justify-start"
                >
                  <span class="mr-2">📊</span>
                  レポート表示
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RootLayout>
</template>