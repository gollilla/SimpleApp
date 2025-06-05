<script setup>
import { computed, onMounted, ref } from 'vue'
import { Head, Link } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'

/**
 * 管理画面システム使用状況レポートページ
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** システム情報 */
  systemInfo: {
    type: Object,
    required: true
  }
})

/**
 * リアクティブデータ
 */
const currentTime = ref(new Date())
const serverLoad = ref({
  cpu: 45,
  memory: 62,
  disk: 78
})

/**
 * システム状態データ（実際の実装ではAPIから取得）
 */
const systemMetrics = ref({
  uptime: '15日 8時間 32分',
  requestsToday: 12547,
  averageResponseTime: 245,
  errorRate: 0.02,
  activeUsers: 156,
  databaseSize: '2.4GB',
  storageUsage: '15.7GB'
})

/**
 * 現在時刻更新
 */
onMounted(() => {
  const interval = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
  
  // コンポーネント破棄時にインターバルをクリア
  return () => clearInterval(interval)
})

/**
 * 負荷レベルの色を取得
 */
const getLoadColor = (percentage) => {
  if (percentage < 50) return 'progress-success'
  if (percentage < 80) return 'progress-warning'
  return 'progress-error'
}

/**
 * 負荷レベルのテキストを取得
 */
const getLoadStatus = (percentage) => {
  if (percentage < 50) return '正常'
  if (percentage < 80) return '注意'
  return '警告'
}

/**
 * バイト数を人間が読める形式に変換
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 数値をカンマ区切りでフォーマット
 */
const formatNumber = (num) => {
  return num.toLocaleString()
}

/**
 * エラー率のパーセント表示
 */
const errorRatePercent = computed(() => {
  return (systemMetrics.value.errorRate * 100).toFixed(2)
})

/**
 * システムヘルススコア計算
 */
const healthScore = computed(() => {
  const cpuScore = Math.max(0, 100 - serverLoad.value.cpu)
  const memoryScore = Math.max(0, 100 - serverLoad.value.memory)
  const errorScore = Math.max(0, 100 - (systemMetrics.value.errorRate * 1000))
  
  return Math.round((cpuScore + memoryScore + errorScore) / 3)
})

/**
 * ヘルススコアの色を取得
 */
const getHealthColor = (score) => {
  if (score >= 80) return 'text-success'
  if (score >= 60) return 'text-warning'
  return 'text-error'
}
</script>

<template>
  <RootLayout>
    <Head title="管理画面 - システム使用状況レポート" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li>システム使用状況レポート</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">システム使用状況レポート</h1>
        <p class="text-base-content/70 mt-2">サーバーのパフォーマンスとリソース使用状況を監視します</p>
      </div>

      <!-- システム概要 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- システムヘルス -->
        <div class="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">システムヘルス</div>
            <div class="text-4xl font-bold" :class="getHealthColor(healthScore)">{{ healthScore }}</div>
            <div class="text-xs opacity-75">/ 100</div>
          </div>
        </div>

        <!-- 稼働時間 -->
        <div class="card bg-success text-success-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">稼働時間</div>
            <div class="text-lg font-bold">{{ systemMetrics.uptime }}</div>
            <div class="text-xs opacity-75">連続稼働中</div>
          </div>
        </div>

        <!-- 今日のリクエスト数 -->
        <div class="card bg-info text-info-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">今日のリクエスト</div>
            <div class="text-2xl font-bold">{{ formatNumber(systemMetrics.requestsToday) }}</div>
            <div class="text-xs opacity-75">{{ currentTime.toLocaleDateString('ja-JP') }}</div>
          </div>
        </div>

        <!-- アクティブユーザー -->
        <div class="card bg-warning text-warning-content shadow">
          <div class="card-body text-center">
            <div class="text-sm opacity-90">アクティブユーザー</div>
            <div class="text-2xl font-bold">{{ formatNumber(systemMetrics.activeUsers) }}</div>
            <div class="text-xs opacity-75">現在オンライン</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- サーバーリソース使用状況 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <span class="mr-2">🖥️</span>
              サーバーリソース使用状況
            </h2>
            
            <div class="space-y-4">
              <!-- CPU使用率 -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium">CPU使用率</span>
                  <span class="text-sm">
                    {{ serverLoad.cpu }}% 
                    <span :class="getLoadColor(serverLoad.cpu).replace('progress-', 'text-')">
                      ({{ getLoadStatus(serverLoad.cpu) }})
                    </span>
                  </span>
                </div>
                <progress 
                  class="progress w-full" 
                  :class="getLoadColor(serverLoad.cpu)"
                  :value="serverLoad.cpu" 
                  max="100"
                ></progress>
              </div>

              <!-- メモリ使用率 -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium">メモリ使用率</span>
                  <span class="text-sm">
                    {{ serverLoad.memory }}% 
                    <span :class="getLoadColor(serverLoad.memory).replace('progress-', 'text-')">
                      ({{ getLoadStatus(serverLoad.memory) }})
                    </span>
                  </span>
                </div>
                <progress 
                  class="progress w-full" 
                  :class="getLoadColor(serverLoad.memory)"
                  :value="serverLoad.memory" 
                  max="100"
                ></progress>
              </div>

              <!-- ディスク使用率 -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium">ディスク使用率</span>
                  <span class="text-sm">
                    {{ serverLoad.disk }}% 
                    <span :class="getLoadColor(serverLoad.disk).replace('progress-', 'text-')">
                      ({{ getLoadStatus(serverLoad.disk) }})
                    </span>
                  </span>
                </div>
                <progress 
                  class="progress w-full" 
                  :class="getLoadColor(serverLoad.disk)"
                  :value="serverLoad.disk" 
                  max="100"
                ></progress>
              </div>
            </div>

            <!-- 詳細情報 -->
            <div class="mt-6 p-4 bg-base-100 rounded-lg">
              <h3 class="font-medium mb-3">詳細情報</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-base-content/70">データベースサイズ:</span>
                  <div class="font-medium">{{ systemMetrics.databaseSize }}</div>
                </div>
                <div>
                  <span class="text-base-content/70">ストレージ使用量:</span>
                  <div class="font-medium">{{ systemMetrics.storageUsage }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- パフォーマンス指標 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <span class="mr-2">⚡</span>
              パフォーマンス指標
            </h2>
            
            <div class="space-y-6">
              <!-- 平均応答時間 -->
              <div class="stat">
                <div class="stat-title">平均応答時間</div>
                <div class="stat-value text-2xl">{{ systemMetrics.averageResponseTime }}ms</div>
                <div class="stat-desc">
                  <span class="text-success">↗︎ 5ms改善 (24h)</span>
                </div>
              </div>

              <!-- エラー率 -->
              <div class="stat">
                <div class="stat-title">エラー率</div>
                <div class="stat-value text-2xl">{{ errorRatePercent }}%</div>
                <div class="stat-desc">
                  <span class="text-success">↘︎ 0.01%減少 (24h)</span>
                </div>
              </div>

              <!-- スループット -->
              <div class="stat">
                <div class="stat-title">今日のリクエスト数</div>
                <div class="stat-value text-xl">{{ formatNumber(systemMetrics.requestsToday) }}</div>
                <div class="stat-desc">
                  <span class="text-info">平均 523req/分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- システム情報 -->
      <div class="card bg-base-200 shadow mt-6">
        <div class="card-body">
          <h2 class="card-title mb-4">
            <span class="mr-2">ℹ️</span>
            システム環境情報
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- バックエンド情報 -->
            <div>
              <h3 class="font-medium mb-3">バックエンド</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-base-content/70">PHP バージョン:</span>
                  <span class="font-medium">{{ systemInfo.php_version }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Laravel バージョン:</span>
                  <span class="font-medium">{{ systemInfo.laravel_version }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">総ユーザー数:</span>
                  <span class="font-medium">{{ formatNumber(systemInfo.total_users) }}</span>
                </div>
              </div>
            </div>

            <!-- フロントエンド情報 -->
            <div>
              <h3 class="font-medium mb-3">フロントエンド</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-base-content/70">Vue.js:</span>
                  <span class="font-medium">v3.x</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Inertia.js:</span>
                  <span class="font-medium">v1.x</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">Tailwind CSS:</span>
                  <span class="font-medium">v3.x</span>
                </div>
              </div>
            </div>

            <!-- インフラ情報 -->
            <div>
              <h3 class="font-medium mb-3">インフラ</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-base-content/70">Webサーバー:</span>
                  <span class="font-medium">Nginx</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">データベース:</span>
                  <span class="font-medium">SQLite</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-base-content/70">キャッシュ:</span>
                  <span class="font-medium">File</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- アラートとお知らせ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <!-- システムアラート -->
        <div class="card bg-warning/10 border border-warning/20 shadow">
          <div class="card-body">
            <h2 class="card-title text-warning mb-4">
              <span class="mr-2">⚠️</span>
              システムアラート
            </h2>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-warning rounded-full"></div>
                <span>ディスク使用量が78%に達しています</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-info rounded-full"></div>
                <span>メモリ使用量が平均より高めです</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 推奨アクション -->
        <div class="card bg-info/10 border border-info/20 shadow">
          <div class="card-body">
            <h2 class="card-title text-info mb-4">
              <span class="mr-2">💡</span>
              推奨アクション
            </h2>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-success rounded-full"></div>
                <span>古いログファイルのクリーンアップ</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-primary rounded-full"></div>
                <span>データベースの最適化実行</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ナビゲーション -->
      <div class="mt-8 flex justify-between">
        <Link 
          :href="route('admin.reports.users')" 
          class="btn btn-outline"
        >
          ← ユーザー活動レポート
        </Link>
        
        <Link 
          :href="route('admin.dashboard')" 
          class="btn btn-primary"
        >
          ダッシュボードに戻る
        </Link>
      </div>

      <!-- 最終更新時刻 -->
      <div class="mt-4 text-center text-sm text-base-content/50">
        最終更新: {{ currentTime.toLocaleString('ja-JP') }}
      </div>
    </div>
  </RootLayout>
</template>