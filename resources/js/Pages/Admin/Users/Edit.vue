<script setup>
import { computed } from 'vue'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

/**
 * ユーザー編集ページ
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
 * 確認ダイアログ
 */
const { showConfirmDialog } = useConfirmDialog()

/**
 * フォームデータ
 */
const form = useForm({
  name: props.user.name,
  email: props.user.email,
  role: props.user.role,
  status: props.user.status,
  password: '',
  password_confirmation: ''
})

/**
 * ユーザー更新処理
 */
const updateUser = () => {
  form.put(route('admin.users.update', props.user.id), {
    onSuccess: () => {
      // 成功時の処理は自動でリダイレクトされる
    }
  })
}

/**
 * ユーザー削除処理
 */
const deleteUser = async () => {
  const confirmed = await showConfirmDialog({
    title: 'ユーザー削除の確認',
    message: `本当に「${props.user.name}」を削除しますか？この操作は取り消すことができません。`,
    acceptLabel: '削除',
    rejectLabel: 'キャンセル'
  })
  
  if (confirmed) {
    form.delete(route('admin.users.destroy', props.user.id))
  }
}

/**
 * 自分自身かどうかチェック
 */
const isSelf = computed(() => {
  return props.user.id === usePage().props.auth.user?.id
})

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
  return new Date(dateString).toLocaleDateString('ja-JP')
}
</script>

<template>
  <RootLayout>
    <Head :title="`管理画面 - ${user.name} の編集`" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li><Link :href="route('admin.users.index')">ユーザー管理</Link></li>
            <li><Link :href="route('admin.users.show', user.id)">{{ user.name }}</Link></li>
            <li>編集</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold text-base-content mt-2">{{ user.name }} の編集</h1>
        <p class="text-base-content/70 mt-2">ユーザー情報を更新します</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- メインフォーム -->
        <div class="lg:col-span-2">
          <form @submit.prevent="updateUser" class="space-y-6">
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
              </div>
            </div>

            <!-- パスワード変更 -->
            <div class="card bg-base-200 shadow">
              <div class="card-body">
                <h2 class="card-title mb-4">パスワード変更</h2>
                <p class="text-sm text-base-content/70 mb-4">パスワードを変更する場合のみ入力してください</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- 新しいパスワード -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">新しいパスワード</span>
                    </label>
                    <input 
                      v-model="form.password"
                      type="password" 
                      class="input input-bordered"
                      :class="{ 'input-error': form.errors.password }"
                      placeholder="新しいパスワードを入力してください"
                    />
                    <div v-if="form.errors.password" class="label">
                      <span class="label-text-alt text-error">{{ form.errors.password }}</span>
                    </div>
                  </div>

                  <!-- パスワード確認 -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">パスワード確認</span>
                    </label>
                    <input 
                      v-model="form.password_confirmation"
                      type="password" 
                      class="input input-bordered"
                      :class="{ 'input-error': form.errors.password_confirmation }"
                      placeholder="パスワードを再入力してください"
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
                      :disabled="isSelf"
                      required
                    >
                      <option value="">ロールを選択してください</option>
                      <option 
                        v-for="role in Object.values(enums.UserRole || {})" 
                        :key="role.value" 
                        :value="role.value"
                      >
                        {{ role.label }}
                      </option>
                    </select>
                    <div v-if="isSelf" class="label">
                      <span class="label-text-alt text-warning">自分自身のロールは変更できません</span>
                    </div>
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
                      :disabled="isSelf"
                      required
                    >
                      <option value="">ステータスを選択してください</option>
                      <option 
                        v-for="status in Object.values(enums.UserStatus || {})" 
                        :key="status.value" 
                        :value="status.value"
                      >
                        {{ status.label }}
                      </option>
                    </select>
                    <div v-if="isSelf" class="label">
                      <span class="label-text-alt text-warning">自分自身のステータスは変更できません</span>
                    </div>
                    <div v-if="form.errors.status" class="label">
                      <span class="label-text-alt text-error">{{ form.errors.status }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- アクションボタン -->
            <div class="flex justify-between">
              <Link 
                :href="route('admin.users.show', user.id)" 
                class="btn btn-outline"
              >
                ← 詳細に戻る
              </Link>
              
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="form.processing"
              >
                <span v-if="form.processing" class="loading loading-spinner loading-sm mr-2"></span>
                変更を保存
              </button>
            </div>
          </form>
        </div>

        <!-- サイドバー -->
        <div class="space-y-6">
          <!-- ユーザー情報サマリー -->
          <div class="card bg-base-200 shadow">
            <div class="card-body">
              <h2 class="card-title mb-4">ユーザー情報</h2>
              
              <div class="space-y-3 text-sm">
                <div>
                  <span class="font-medium">ユーザーID:</span>
                  <span class="ml-2">{{ user.id }}</span>
                </div>
                <div>
                  <span class="font-medium">登録日:</span>
                  <span class="ml-2">{{ formatDate(user.created_at) }}</span>
                </div>
                <div>
                  <span class="font-medium">最終更新:</span>
                  <span class="ml-2">{{ formatDate(user.updated_at) }}</span>
                </div>
                <div>
                  <span class="font-medium">メール認証:</span>
                  <span class="ml-2">
                    <span v-if="user.email_verified_at" class="text-success">✓ 認証済み</span>
                    <span v-else class="text-warning">⚠ 未認証</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 危険な操作 -->
          <div class="card bg-error/10 border border-error/20 shadow">
            <div class="card-body">
              <h2 class="card-title text-error mb-4">
                <span class="mr-2">⚠️</span>
                危険な操作
              </h2>
              
              <div class="space-y-3">
                <button 
                  v-if="!isSelf"
                  @click="deleteUser"
                  class="btn btn-error w-full justify-start"
                >
                  <span class="mr-2">🗑️</span>
                  ユーザーを削除
                </button>
                
                <div v-if="isSelf" class="text-sm text-base-content/70">
                  自分自身は削除できません
                </div>
              </div>
              
              <div class="mt-4 text-xs text-error/70">
                削除されたユーザーは復元できません。この操作は慎重に行ってください。
              </div>
            </div>
          </div>

          <!-- ヘルプ情報 -->
          <div class="card bg-info/10 border border-info/20 shadow">
            <div class="card-body">
              <h2 class="card-title text-info mb-4">
                <span class="mr-2">💡</span>
                編集のヒント
              </h2>
              
              <div class="text-sm space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-info rounded-full"></div>
                  <span>パスワードは空欄で変更されません</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-success rounded-full"></div>
                  <span>変更は即座に反映されます</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-warning rounded-full"></div>
                  <span>自分自身の権限は変更できません</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RootLayout>
</template>