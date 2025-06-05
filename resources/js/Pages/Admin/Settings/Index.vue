<script setup>
import { Head, Link } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'

/**
 * 管理画面設定一覧ページ
 */
</script>

<template>
  <RootLayout>
    <Head title="管理画面 - システム設定" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li>システム設定</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">システム設定</h1>
        <p class="text-base-content/70 mt-2">システムの各種設定を管理します</p>
      </div>

      <!-- 設定カテゴリ -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 一般設定 -->
        <div class="card bg-base-200 shadow hover:shadow-lg transition-shadow">
          <div class="card-body">
            <div class="flex items-center mb-4">
              <div class="avatar placeholder mr-3">
                <div class="bg-primary text-primary-content rounded-full w-12">
                  <span class="text-xl">⚙️</span>
                </div>
              </div>
              <h2 class="card-title">一般設定</h2>
            </div>
            <p class="text-base-content/70 mb-4">
              サイト名、説明、タイムゾーンなどの基本的なシステム設定を管理します。
            </p>
            <div class="card-actions">
              <Link 
                :href="route('admin.settings.general')" 
                class="btn btn-primary btn-sm"
              >
                設定を開く
              </Link>
            </div>
          </div>
        </div>

        <!-- セキュリティ設定 -->
        <div class="card bg-base-200 shadow hover:shadow-lg transition-shadow">
          <div class="card-body">
            <div class="flex items-center mb-4">
              <div class="avatar placeholder mr-3">
                <div class="bg-warning text-warning-content rounded-full w-12">
                  <span class="text-xl">🔒</span>
                </div>
              </div>
              <h2 class="card-title">セキュリティ設定</h2>
            </div>
            <p class="text-base-content/70 mb-4">
              パスワードポリシー、ログイン制限、二要素認証などのセキュリティ設定を管理します。
            </p>
            <div class="card-actions">
              <Link 
                :href="route('admin.settings.security')" 
                class="btn btn-warning btn-sm"
              >
                設定を開く
              </Link>
            </div>
          </div>
        </div>

        <!-- その他の設定（将来の拡張用） -->
        <div class="card bg-base-200 shadow hover:shadow-lg transition-shadow opacity-60">
          <div class="card-body">
            <div class="flex items-center mb-4">
              <div class="avatar placeholder mr-3">
                <div class="bg-info text-info-content rounded-full w-12">
                  <span class="text-xl">📧</span>
                </div>
              </div>
              <h2 class="card-title">メール設定</h2>
            </div>
            <p class="text-base-content/70 mb-4">
              SMTP設定、メールテンプレート、通知設定などを管理します。
            </p>
            <div class="card-actions">
              <button class="btn btn-info btn-sm" disabled>
                準備中
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- システム情報 -->
      <div class="mt-8">
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">システム情報</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="stat">
                <div class="stat-title">アプリケーション</div>
                <div class="stat-value text-lg">Laravel</div>
                <div class="stat-desc">v11.x</div>
              </div>
              <div class="stat">
                <div class="stat-title">フロントエンド</div>
                <div class="stat-value text-lg">Vue.js + Inertia</div>
                <div class="stat-desc">v3.x</div>
              </div>
              <div class="stat">
                <div class="stat-title">UI Framework</div>
                <div class="stat-value text-lg">Tailwind + DaisyUI</div>
                <div class="stat-desc">v4.x</div>
              </div>
            </div>
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
      </div>
    </div>
  </RootLayout>
</template>