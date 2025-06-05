<script setup>
import { ref } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

/**
 * 管理画面セキュリティ設定ページ
 */

// 確認ダイアログ
const { showConfirmDialog } = useConfirmDialog()

// セキュリティ設定フォームデータ
const form = useForm({
  password_min_length: 8,
  password_require_uppercase: true,
  password_require_lowercase: true,
  password_require_numbers: true,
  password_require_symbols: false,
  session_timeout: 120,
  max_login_attempts: 5,
  lockout_duration: 15,
  two_factor_auth: false,
  force_password_change: 90,
  admin_ip_whitelist: '',
  security_headers: true,
  csrf_protection: true
})

/**
 * 設定保存処理
 */
const saveSecuritySettings = () => {
  form.processing = true
  
  // デモ用の擬似保存処理
  setTimeout(() => {
    form.processing = false
    alert('セキュリティ設定を保存しました。')
  }, 1000)
}

/**
 * 設定リセット処理
 */
const resetSecuritySettings = async () => {
  const confirmed = await showConfirmDialog({
    title: 'セキュリティ設定のリセット',
    message: 'セキュリティ設定をデフォルト値にリセットしますか？この操作はシステムのセキュリティに影響を与える可能性があります。',
    acceptLabel: 'リセット',
    rejectLabel: 'キャンセル'
  })
  
  if (confirmed) {
    form.reset()
  }
}

/**
 * パスワード強度レベル計算
 */
const passwordStrengthLevel = ref(3)
const getPasswordStrengthText = (level) => {
  const levels = {
    1: { text: '非常に弱い', class: 'text-error' },
    2: { text: '弱い', class: 'text-warning' },
    3: { text: '標準', class: 'text-info' },
    4: { text: '強い', class: 'text-success' },
    5: { text: '非常に強い', class: 'text-success font-bold' }
  }
  return levels[level] || levels[3]
}
</script>

<template>
  <RootLayout>
    <Head title="管理画面 - セキュリティ設定" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li><Link :href="route('admin.settings.index')">システム設定</Link></li>
            <li>セキュリティ設定</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">セキュリティ設定</h1>
        <p class="text-base-content/70 mt-2">システムのセキュリティポリシーとアクセス制御を管理します</p>
      </div>

      <form @submit.prevent="saveSecuritySettings" class="space-y-6">
        <!-- パスワードポリシー -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <span class="mr-2">🔐</span>
              パスワードポリシー
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- 最小文字数 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">最小文字数</span>
                </label>
                <input 
                  v-model.number="form.password_min_length"
                  type="number" 
                  min="6" 
                  max="128"
                  class="input input-bordered"
                />
              </div>

              <!-- パスワード期限 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">パスワード変更期限（日）</span>
                </label>
                <input 
                  v-model.number="form.force_password_change"
                  type="number" 
                  min="0"
                  max="365"
                  class="input input-bordered"
                  placeholder="0で無期限"
                />
              </div>
            </div>

            <!-- パスワード要件 -->
            <div class="space-y-3 mt-4">
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.password_require_uppercase"
                    type="checkbox" 
                    class="checkbox checkbox-primary mr-3"
                  />
                  <span class="label-text">大文字を必須にする（A-Z）</span>
                </label>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.password_require_lowercase"
                    type="checkbox" 
                    class="checkbox checkbox-primary mr-3"
                  />
                  <span class="label-text">小文字を必須にする（a-z）</span>
                </label>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.password_require_numbers"
                    type="checkbox" 
                    class="checkbox checkbox-primary mr-3"
                  />
                  <span class="label-text">数字を必須にする（0-9）</span>
                </label>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.password_require_symbols"
                    type="checkbox" 
                    class="checkbox checkbox-primary mr-3"
                  />
                  <span class="label-text">記号を必須にする（!@#$%等）</span>
                </label>
              </div>
            </div>

            <!-- パスワード強度表示 -->
            <div class="mt-4 p-3 bg-base-100 rounded-lg">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">現在のパスワード強度レベル:</span>
                <span :class="getPasswordStrengthText(passwordStrengthLevel).class" class="font-bold">
                  {{ getPasswordStrengthText(passwordStrengthLevel).text }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ログイン制御 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <span class="mr-2">🚪</span>
              ログイン制御
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- セッション タイムアウト -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">セッション タイムアウト（分）</span>
                </label>
                <input 
                  v-model.number="form.session_timeout"
                  type="number" 
                  min="5"
                  max="1440"
                  class="input input-bordered"
                />
              </div>

              <!-- 最大ログイン試行回数 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">最大ログイン試行回数</span>
                </label>
                <input 
                  v-model.number="form.max_login_attempts"
                  type="number" 
                  min="3"
                  max="20"
                  class="input input-bordered"
                />
              </div>

              <!-- ロックアウト期間 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ロックアウト期間（分）</span>
                </label>
                <input 
                  v-model.number="form.lockout_duration"
                  type="number" 
                  min="1"
                  max="1440"
                  class="input input-bordered"
                />
              </div>
            </div>

            <!-- 管理者IP制限 -->
            <div class="form-control mt-4">
              <label class="label">
                <span class="label-text">管理者アクセス許可IPアドレス</span>
                <span class="label-text-alt">複数の場合はカンマ区切り、空欄で制限なし</span>
              </label>
              <textarea 
                v-model="form.admin_ip_whitelist"
                class="textarea textarea-bordered h-20"
                placeholder="例: 192.168.1.100, 10.0.0.0/24"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 高度なセキュリティ設定 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <span class="mr-2">🛡️</span>
              高度なセキュリティ設定
            </h2>
            
            <div class="space-y-4">
              <!-- 二要素認証 -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.two_factor_auth"
                    type="checkbox" 
                    class="toggle toggle-warning mr-3"
                  />
                  <div>
                    <span class="label-text font-medium">二要素認証を有効にする</span>
                    <div class="text-sm text-base-content/70">
                      管理者アカウントで二要素認証を必須にします
                    </div>
                  </div>
                </label>
              </div>

              <!-- セキュリティヘッダー -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.security_headers"
                    type="checkbox" 
                    class="toggle toggle-success mr-3"
                  />
                  <div>
                    <span class="label-text font-medium">セキュリティヘッダーを送信</span>
                    <div class="text-sm text-base-content/70">
                      X-Frame-Options、Content-Security-Policy等のセキュリティヘッダーを送信します
                    </div>
                  </div>
                </label>
              </div>

              <!-- CSRF保護 -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.csrf_protection"
                    type="checkbox" 
                    class="toggle toggle-error mr-3"
                  />
                  <div>
                    <span class="label-text font-medium">CSRF保護を有効にする</span>
                    <div class="text-sm text-base-content/70">
                      Cross-Site Request Forgery攻撃からシステムを保護します（推奨）
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- セキュリティ状況サマリー -->
        <div class="card bg-warning/10 border border-warning/20 shadow">
          <div class="card-body">
            <h2 class="card-title text-warning mb-4">
              <span class="mr-2">⚠️</span>
              セキュリティ状況
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 class="font-medium mb-2">推奨設定</h3>
                <ul class="space-y-1 text-base-content/70">
                  <li>✅ パスワード最小8文字</li>
                  <li>✅ ログイン試行回数制限</li>
                  <li>✅ セッション タイムアウト設定</li>
                  <li>✅ CSRF保護有効</li>
                </ul>
              </div>
              <div>
                <h3 class="font-medium mb-2">要検討項目</h3>
                <ul class="space-y-1 text-base-content/70">
                  <li>⚠️ 二要素認証の有効化</li>
                  <li>⚠️ 管理者IP制限の設定</li>
                  <li>⚠️ パスワード記号要求</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- アクションボタン -->
        <div class="flex justify-between">
          <div class="space-x-2">
            <Link 
              :href="route('admin.settings.index')" 
              class="btn btn-outline"
            >
              ← 設定一覧に戻る
            </Link>
          </div>
          
          <div class="space-x-2">
            <button 
              type="button" 
              @click="resetSecuritySettings"
              class="btn btn-ghost"
              :disabled="form.processing"
            >
              リセット
            </button>
            <button 
              type="submit" 
              class="btn btn-warning"
              :disabled="form.processing"
            >
              <span v-if="form.processing" class="loading loading-spinner loading-sm mr-2"></span>
              セキュリティ設定を保存
            </button>
          </div>
        </div>
      </form>
    </div>
  </RootLayout>
</template>