<script setup>
import { ref, computed } from 'vue'
import { Head, Link, router, usePage } from '@inertiajs/vue3'
import RootLayout from '@/Layouts/RootLayout.vue'
import SearchInput from '@/Components/Admin/SearchInput.vue'
import StatusSelector from '@/Components/Admin/StatusSelector.vue'
import UserStatusBadge from '@/Components/Admin/UserStatusBadge.vue'

/**
 * ユーザー一覧ページ
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** ユーザー一覧データ */
  users: {
    type: Object,
    required: true
  },
  /** フィルター条件 */
  filters: {
    type: Object,
    default: () => ({})
  }
})

/**
 * フィルター条件のリアクティブデータ
 */
const searchTerm = ref(props.filters.search || '')
const selectedRole = ref(props.filters.role || '')
const selectedStatus = ref(props.filters.status || '')
const sortBy = ref(props.filters.sort_by || 'created_at')
const sortOrder = ref(props.filters.sort_order || 'desc')

/**
 * 共有Enumデータを取得
 */
const { enums } = usePage().props

/**
 * ロール選択肢
 */
const roleOptions = computed(() => [
  { value: '', label: 'すべてのロール' },
  ...Object.values(enums.UserRole || {}).map(role => ({
    value: role.value,
    label: role.label
  }))
])

/**
 * ステータス選択肢
 */
const statusOptions = computed(() => [
  { value: '', label: 'すべてのステータス' },
  ...Object.values(enums.UserStatus || {}).map(status => ({
    value: status.value,
    label: status.label
  }))
])

/**
 * 検索・フィルター実行
 */
const applyFilters = () => {
  router.get(route('admin.users.index'), {
    search: searchTerm.value,
    role: selectedRole.value,
    status: selectedStatus.value,
    sort_by: sortBy.value,
    sort_order: sortOrder.value
  }, {
    preserveState: true,
    replace: true
  })
}

/**
 * フィルターリセット
 */
const resetFilters = () => {
  searchTerm.value = ''
  selectedRole.value = ''
  selectedStatus.value = ''
  sortBy.value = 'created_at'
  sortOrder.value = 'desc'
  applyFilters()
}

/**
 * ソート変更
 */
const changeSorting = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
  applyFilters()
}

/**
 * ソートアイコン取得
 */
const getSortIcon = (field) => {
  if (sortBy.value !== field) return '↕️'
  return sortOrder.value === 'asc' ? '⬆️' : '⬇️'
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

/**
 * 日付フォーマット
 */
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ja-JP')
}
</script>

<template>
  <RootLayout>
    <Head title="ユーザー管理" />
    
    <div class="p-6">
      <!-- ページヘッダー -->
      <div class="mb-6">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><Link :href="route('admin.dashboard')">ダッシュボード</Link></li>
            <li>ユーザー管理</li>
          </ul>
        </div>
        <div class="flex justify-between items-start mt-2">
          <div>
            <h1 class="text-3xl font-bold text-base-content">ユーザー管理</h1>
            <p class="text-base-content/70 mt-1">登録ユーザーの一覧と管理</p>
          </div>
          <Link 
            :href="route('admin.users.create')" 
            class="btn btn-primary"
          >
            <span class="mr-2">➕</span>
            新規ユーザー作成
          </Link>
        </div>
      </div>

      <!-- フィルターパネル -->
      <div class="card bg-base-200 shadow mb-6">
        <div class="card-body">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <!-- 検索 -->
            <div>
              <SearchInput
                v-model="searchTerm"
                placeholder="名前またはメールで検索..."
                @search="applyFilters"
              />
            </div>

            <!-- ロールフィルター -->
            <div>
              <StatusSelector
                v-model="selectedRole"
                :options="roleOptions"
                label="ロール"
                @change="applyFilters"
              />
            </div>

            <!-- ステータスフィルター -->
            <div>
              <StatusSelector
                v-model="selectedStatus"
                :options="statusOptions"
                label="ステータス"
                @change="applyFilters"
              />
            </div>

            <!-- リセットボタン -->
            <div>
              <button 
                @click="resetFilters"
                class="btn btn-outline w-full"
              >
                リセット
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ユーザーテーブル -->
      <div class="card bg-base-200 shadow">
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>
                    <button 
                      @click="changeSorting('id')"
                      class="btn btn-ghost btn-sm"
                    >
                      ID {{ getSortIcon('id') }}
                    </button>
                  </th>
                  <th>
                    <button 
                      @click="changeSorting('name')"
                      class="btn btn-ghost btn-sm"
                    >
                      名前 {{ getSortIcon('name') }}
                    </button>
                  </th>
                  <th>
                    <button 
                      @click="changeSorting('email')"
                      class="btn btn-ghost btn-sm"
                    >
                      メール {{ getSortIcon('email') }}
                    </button>
                  </th>
                  <th>ロール</th>
                  <th>ステータス</th>
                  <th>
                    <button 
                      @click="changeSorting('created_at')"
                      class="btn btn-ghost btn-sm"
                    >
                      登録日 {{ getSortIcon('created_at') }}
                    </button>
                  </th>
                  <th>アクション</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users.data" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td class="font-medium">{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <div class="badge badge-outline whitespace-nowrap">
                      {{ getRoleLabel(user.role) }}
                    </div>
                  </td>
                  <td>
                    <UserStatusBadge 
                      :status="user.status" 
                      :label="getStatusLabel(user.status)"
                    />
                  </td>
                  <td>{{ formatDate(user.created_at) }}</td>
                  <td>
                    <div class="flex gap-1">
                      <Link 
                        :href="route('admin.users.show', user.id)"
                        class="btn btn-ghost btn-xs"
                        title="詳細表示"
                      >
                        👁️
                      </Link>
                      <Link 
                        :href="route('admin.users.edit', user.id)"
                        class="btn btn-ghost btn-xs"
                        title="編集"
                      >
                        ✏️
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ページネーション -->
          <div class="flex justify-between items-center mt-4" v-if="users.links">
            <div class="text-sm text-base-content/70">
              {{ users.from }} - {{ users.to }} / {{ users.total }} 件
            </div>
            
            <div class="join">
              <template v-for="link in users.links" :key="link.label">
                <Link
                  v-if="link.url"
                  :href="link.url"
                  class="join-item btn btn-sm"
                  :class="{
                    'btn-active': link.active
                  }"
                >
                  {{ link.label }}
                </Link>
                <button
                  v-else
                  class="join-item btn btn-sm btn-disabled"
                  disabled
                >
                  {{ link.label }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RootLayout>
</template>