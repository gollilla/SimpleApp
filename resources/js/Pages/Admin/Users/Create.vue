<script setup>
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'

/**
 * ユーザー作成ページ
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** ロール一覧 */
  roles: {
    type: Array,
    required: true
  },
  /** ステータス一覧 */
  statuses: {
    type: Array,
    required: true
  }
})

/**
 * 共有Enumデータを取得
 */
const { enums } = usePage().props

/**
 * フォームデータ
 */
const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'user',
  status: 'active'
})

/**
 * ユーザー作成処理
 */
const createUser = () => {
  form.post(route('admin.users.store'), {
    onSuccess: () => {
      // 成功時の処理は自動でリダイレクトされる
    }
  })
}

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
    <Head title="管理画面 - ユーザー作成" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li><Link :href="route('admin.users.index')">ユーザー管理</Link></li>
            <li>新規作成</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">新規ユーザー作成</h1>
        <p class="text-base-content/70 mt-2">新しいユーザーアカウントを作成します</p>
      </div>

      <form @submit.prevent="createUser" class="space-y-6">
        <!-- 基本情報 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">基本情報</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- 名前 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">名前 <span class="text-error">*</span></span>
                </label>
                <input 
                  v-model="form.name"
                  type="text" 
                  class="input input-bordered"
                  :class="{ 'input-error': form.errors.name }"
                  placeholder="ユーザー名を入力してください"
                  required
                />
                <div v-if="form.errors.name" class="label">
                  <span class="label-text-alt text-error">{{ form.errors.name }}</span>
                </div>
              </div>

              <!-- メールアドレス -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">メールアドレス <span class="text-error">*</span></span>
                </label>
                <input 
                  v-model="form.email"
                  type="email" 
                  class="input input-bordered"
                  :class="{ 'input-error': form.errors.email }"
                  placeholder="example@domain.com"
                  required
                />
                <div v-if="form.errors.email" class="label">
                  <span class="label-text-alt text-error">{{ form.errors.email }}</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- パスワード -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">パスワード <span class="text-error">*</span></span>
                </label>
                <input 
                  v-model="form.password"
                  type="password" 
                  class="input input-bordered"
                  :class="{ 'input-error': form.errors.password }"
                  placeholder="パスワードを入力してください"
                  required
                />
                <div v-if="form.errors.password" class="label">
                  <span class="label-text-alt text-error">{{ form.errors.password }}</span>
                </div>
              </div>

              <!-- パスワード確認 -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">パスワード確認 <span class="text-error">*</span></span>
                </label>
                <input 
                  v-model="form.password_confirmation"
                  type="password" 
                  class="input input-bordered"
                  :class="{ 'input-error': form.errors.password_confirmation }"
                  placeholder="パスワードを再入力してください"
                  required
                />
                <div v-if="form.errors.password_confirmation" class="label">
                  <span class="label-text-alt text-error">{{ form.errors.password_confirmation }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 権限・ステータス設定 -->
        <div class="card bg-base-200 shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">権限・ステータス設定</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- ロール -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ロール <span class="text-error">*</span></span>
                </label>
                <select 
                  v-model="form.role" 
                  class="select select-bordered"
                  :class="{ 'select-error': form.errors.role }"
                  required
                >
                  <option value="">ロールを選択してください</option>
                  <option 
                    v-for="role in roles" 
                    :key="role.value" 
                    :value="role.value"
                  >
                    {{ getRoleLabel(role.value) }}
                  </option>
                </select>
                <div v-if="form.errors.role" class="label">
                  <span class="label-text-alt text-error">{{ form.errors.role }}</span>
                </div>
              </div>

              <!-- ステータス -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ステータス <span class="text-error">*</span></span>
                </label>
                <select 
                  v-model="form.status" 
                  class="select select-bordered"
                  :class="{ 'select-error': form.errors.status }"
                  required
                >
                  <option value="">ステータスを選択してください</option>
                  <option 
                    v-for="status in statuses" 
                    :key="status.value" 
                    :value="status.value"
                  >
                    {{ getStatusLabel(status.value) }}
                  </option>
                </select>
                <div v-if="form.errors.status" class="label">
                  <span class="label-text-alt text-error">{{ form.errors.status }}</span>
                </div>
              </div>
            </div>

            <!-- 権限説明 -->
            <div class="mt-4 p-4 bg-base-100 rounded-lg">
              <h3 class="font-medium mb-2">ロール説明</h3>
              <div class="text-sm space-y-1">
                <div class="flex justify-between">
                  <span class="font-medium">管理者:</span>
                  <span class="text-base-content/70">システム全体の管理・設定が可能</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">モデレーター:</span>
                  <span class="text-base-content/70">コンテンツの管理・監視が可能</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">一般ユーザー:</span>
                  <span class="text-base-content/70">一般的な機能の利用が可能</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">ゲスト:</span>
                  <span class="text-base-content/70">閲覧などの限定的な機能のみ利用可能</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- アクションボタン -->
        <div class="flex justify-between">
          <Link 
            :href="route('admin.users.index')" 
            class="btn btn-outline"
          >
            ← ユーザー一覧に戻る
          </Link>
          
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="form.processing"
          >
            <span v-if="form.processing" class="loading loading-spinner loading-sm mr-2"></span>
            ユーザーを作成
          </button>
        </div>
      </form>
    </div>
  </RootLayout>
</template>