<script setup>
import { computed } from 'vue'
import { Head, Link, usePage } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'

/**
 * 管理画面ユーザー活動レポートページ
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** ユーザー登録推移データ */
  userRegistrations: {
    type: Array,
    required: true
  },
  /** ステータス別ユーザー数 */
  userStatusCounts: {
    type: Object,
    required: true
  }
})

/**
 * 総ユーザー数計算
 */
const totalUsers = computed(() => {
  return Object.values(props.userStatusCounts).reduce((sum, count) => sum + count, 0)
})

/**
 * 過去30日間の登録数合計
 */
const totalRegistrationsLast30Days = computed(() => {
  return props.userRegistrations.reduce((sum, day) => sum + day.count, 0)
})

/**
 * 平均日間登録数
 */
const averageDailyRegistrations = computed(() => {
  if (props.userRegistrations.length === 0) return 0
  return Math.round((totalRegistrationsLast30Days.value / props.userRegistrations.length) * 10) / 10
})

/**
 * ステータス別色設定
 */
const getStatusColor = (status) => {
  const colors = {
    active: 'bg-success',
    inactive: 'bg-base-300',
    pending: 'bg-warning',
    suspended: 'bg-error'
  }
  return colors[status] || 'bg-base-300'
}

/**
 * 共有Enumデータを取得
 */
const { enums } = usePage().props

/**
 * ステータス別ラベル
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
  return new Date(dateString).toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric'
  })
}

/**
 * パーセンテージ計算
 */
const getPercentage = (value, total) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}
</script>

<template>
  <RootLayout>
    <Head title="管理画面 - ユーザー活動レポート" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li>ユーザー活動レポート</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">ユーザー活動レポート</h1>
        <p class="text-base-content/70 mt-2">ユーザーの登録状況と活動状況を分析します</p>
      </div>

      <!-- サマリー統計 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- 総ユーザー数 -->
        <div class="card bg-primary text-primary-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">総ユーザー数</div>
            <div class="text-3xl font-bold">{{ totalUsers.toLocaleString() }}</div>
            <div class="text-xs opacity-75">全ステータス含む</div>
          </div>
        </div>

        <!-- 過去30日の登録数 -->
        <div class="card bg-success text-success-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">過去30日の登録数</div>
            <div class="text-3xl font-bold">{{ totalRegistrationsLast30Days.toLocaleString() }}</div>
            <div class="text-xs opacity-75">新規登録ユーザー</div>
          </div>
        </div>

        <!-- 平均日間登録数 -->
        <div class="card bg-info text-info-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">平均日間登録数</div>
            <div class="text-3xl font-bold">{{ averageDailyRegistrations }}</div>
            <div class="text-xs opacity-75">人/日</div>
          </div>
        </div>

        <!-- アクティブ率 -->
        <div class="card bg-warning text-warning-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">アクティブ率</div>
            <div class="text-3xl font-bold">{{ getPercentage(userStatusCounts.active, totalUsers) }}%</div>
            <div class="text-xs opacity-75">{{ userStatusCounts.active.toLocaleString() }} / {{ totalUsers.toLocaleString() }}</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- ユーザー登録推移 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <span class="mr-2">📈</span>
              ユーザー登録推移（過去30日）
            </h2>
            
            <!-- 簡易チャート（実際の実装ではChart.jsやApexChartsを使用） -->
            <div class="overflow-x-auto">
              <div class="flex items-end space-x-1 h-32 mb-4">
                <div 
                  v-for="(day, index) in userRegistrations" 
                  :key="index"
                  class="flex flex-col items-center min-w-0 flex-1"
                >
                  <div 
                    class="bg-primary rounded-t w-full transition-all hover:bg-primary-focus"
                    :style="{ 
                      height: day.count > 0 ? `${Math.max((day.count / Math.max(...userRegistrations.map(d => d.count))) * 100, 10)}%` : '2px' 
                    }"
                    :title="`${formatDate(day.date)}: ${day.count}人`"
                  ></div>
                  <div class="text-xs text-base-content/50 mt-1 transform -rotate-45 origin-bottom-left">
                    {{ formatDate(day.date) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>期間</th>
                    <th>登録数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>過去7日間</td>
                    <td class="font-bold">
                      {{ userRegistrations.slice(-7).reduce((sum, day) => sum + day.count, 0) }}人
                    </td>
                  </tr>
                  <tr>
                    <td>過去30日間</td>
                    <td class="font-bold">{{ totalRegistrationsLast30Days }}人</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ユーザーステータス分布 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <span class="mr-2">👥</span>
              ユーザーステータス分布
            </h2>
            
            <!-- ステータス別統計 -->
            <div class="space-y-3 mb-4">
              <div 
                v-for="(count, status) in userStatusCounts" 
                :key="status"
                class="flex items-center justify-between p-3 bg-base-100 rounded-lg"
              >
                <div class="flex items-center">
                  <div 
                    class="w-4 h-4 rounded-full mr-3"
                    :class="getStatusColor(status)"
                  ></div>
                  <span class="font-medium">{{ getStatusLabel(status) }}</span>
                </div>
                <div class="text-right">
                  <div class="font-bold">{{ count.toLocaleString() }}人</div>
                  <div class="text-xs text-base-content/70">
                    {{ getPercentage(count, totalUsers) }}%
                  </div>
                </div>
              </div>
            </div>

            <!-- プログレスバー表示 -->
            <div class="space-y-2">
              <div 
                v-for="(count, status) in userStatusCounts" 
                :key="`progress-${status}`"
                class="flex items-center space-x-2"
              >
                <span class="text-sm w-20">{{ getStatusLabel(status) }}</span>
                <progress 
                  class="progress w-full"
                  :class="{
                    'progress-success': status === 'active',
                    'progress-warning': status === 'pending',
                    'progress-error': status === 'suspended',
                    'progress-neutral': status === 'inactive'
                  }"
                  :value="count" 
                  :max="totalUsers"
                ></progress>
                <span class="text-xs w-12 text-right">{{ getPercentage(count, totalUsers) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 詳細データテーブル -->
      <div class="card bg-base-200 shadow mt-6">
        <div class="card-body">
          <h2 class="card-title mb-4">
            <span class="mr-2">📊</span>
            詳細データ
          </h2>
          
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>新規登録数</th>
                  <th>累計登録数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(day, index) in userRegistrations.slice().reverse().slice(0, 10)" :key="index">
                  <td>{{ new Date(day.date).toLocaleDateString('ja-JP') }}</td>
                  <td>{{ day.count }}人</td>
                  <td>{{ userRegistrations.slice(0, userRegistrations.length - index).reduce((sum, d) => sum + d.count, 0) }}人</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ナビゲーション -->
      <div class="mt-8 flex justify-between">
        <Link 
          :href="route('admin.dashboard')" 
          class="btn btn-outline"
        >
          ← ダッシュボードに戻る
        </Link>
        
        <Link 
          :href="route('admin.reports.system')" 
          class="btn btn-primary"
        >
          システム使用状況レポート →
        </Link>
      </div>
    </div>
  </RootLayout>
</template>