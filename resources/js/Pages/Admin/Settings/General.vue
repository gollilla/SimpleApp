<script setup>
import { ref } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

/**
 * 管理画面一般設定ページ
 */

// 確認ダイアログ
const { showConfirmDialog } = useConfirmDialog()

// 設定フォームデータ
const form = useForm({
  site_name: 'SimpleApp',
  site_description: 'Laravel + Vue.js + Inertia.js で構築されたシンプルなWebアプリケーション',
  timezone: 'Asia/Tokyo',
  language: 'ja',
  maintenance_mode: false,
  user_registration: true,
  email_verification: true
})

/**
 * 設定保存処理
 */
const saveSettings = () => {
  // 実際の実装では、ここでサーバーに設定を保存する処理を行います
  form.processing = true
  
  // デモ用の擬似保存処理
  setTimeout(() => {
    form.processing = false
    // 成功メッセージを表示（実際はInertiaのflashメッセージを使用）
    alert('設定を保存しました。')
  }, 1000)
}

/**
 * 設定リセット処理
 */
const resetSettings = async () => {
  const confirmed = await showConfirmDialog({
    title: '設定のリセット',
    message: '設定をデフォルト値にリセットしますか？この操作は元に戻すことができません。',
    acceptLabel: 'リセット',
    rejectLabel: 'キャンセル'
  })
  
  if (confirmed) {
    form.reset()
  }
}
</script>

<template>
  <RootLayout>
    <Head title="管理画面 - 一般設定" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li><Link :href="route('admin.settings.index')">システム設定</Link></li>
            <li>一般設定</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">一般設定</h1>
        <p class="text-base-content/70 mt-2">サイト名、言語、タイムゾーンなどの基本設定を管理します</p>
      </div>

      <form @submit.prevent="saveSettings" class="space-y-6">
        <!-- サイト基本情報 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">サイト基本情報</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- サイト名 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">サイト名</span>
                </label>
                <input 
                  v-model="form.site_name"
                  type="text" 
                  class="input input-bordered"
                  placeholder="サイト名を入力してください"
                  required
                />
              </div>

              <!-- 言語設定 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">言語</span>
                </label>
                <select v-model="form.language" class="select select-bordered">
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>

            <!-- サイト説明 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">サイト説明</span>
              </label>
              <textarea 
                v-model="form.site_description"
                class="textarea textarea-bordered h-24"
                placeholder="サイトの説明を入力してください"
              ></textarea>
            </div>

            <!-- タイムゾーン -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">タイムゾーン</span>
              </label>
              <select v-model="form.timezone" class="select select-bordered">
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- システム動作設定 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">システム動作設定</h2>
            
            <div class="space-y-4">
              <!-- メンテナンスモード -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.maintenance_mode"
                    type="checkbox" 
                    class="toggle toggle-warning mr-3"
                  />
                  <div>
                    <span class="label-text font-medium">メンテナンスモード</span>
                    <div class="text-sm text-base-content/70">
                      有効にすると、管理者以外はサイトにアクセスできなくなります
                    </div>
                  </div>
                </label>
              </div>

              <!-- ユーザー登録 -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.user_registration"
                    type="checkbox" 
                    class="toggle toggle-primary mr-3"
                  />
                  <div>
                    <span class="label-text font-medium">ユーザー登録を許可</span>
                    <div class="text-sm text-base-content/70">
                      新規ユーザーの登録を受け付けるかどうかを設定します
                    </div>
                  </div>
                </label>
              </div>

              <!-- メール認証 -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start">
                  <input 
                    v-model="form.email_verification"
                    type="checkbox" 
                    class="toggle toggle-info mr-3"
                  />
                  <div>
                    <span class="label-text font-medium">メールアドレス認証を必須にする</span>
                    <div class="text-sm text-base-content/70">
                      ユーザー登録時にメールアドレスの認証を必須にします
                    </div>
                  </div>
                </label>
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
              @click="resetSettings"
              class="btn btn-ghost"
              :disabled="form.processing"
            >
              リセット
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="form.processing"
            >
              <span v-if="form.processing" class="loading loading-spinner loading-sm mr-2"></span>
              設定を保存
            </button>
          </div>
        </div>
      </form>
    </div>
  </RootLayout>
</template>