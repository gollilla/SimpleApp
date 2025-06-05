<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

/**
 * ユーザー管理ページ
 * ユーザーの一覧表示、検索、編集、削除機能を提供
 */

const props = defineProps({
    users: {
        type: Object,
        required: true
    },
    filters: {
        type: Object,
        default: () => ({})
    },
    role_options: {
        type: Array,
        required: true
    }
});

// 検索・フィルター
const searchForm = useForm({
    search: props.filters.search || '',
    role: props.filters.role || ''
});

// 編集モーダル
const editModal = ref(null);
const editForm = useForm({
    id: null,
    name: '',
    email: '',
    role: ''
});

// 削除確認モーダル
const deleteModal = ref(null);
const deleteUserId = ref(null);
const deleteUserName = ref('');

/**
 * 検索実行
 */
const search = () => {
    router.get(route('admin.users'), searchForm.data(), {
        preserveState: true,
        replace: true
    });
};

/**
 * フィルターリセット
 */
const resetFilters = () => {
    searchForm.reset();
    router.get(route('admin.users'));
};

/**
 * 編集モーダルを開く
 */
const openEditModal = (user) => {
    editForm.id = user.id;
    editForm.name = user.name;
    editForm.email = user.email;
    editForm.role = user.role;
    editModal.value.showModal();
};

/**
 * ユーザー情報更新
 */
const updateUser = () => {
    editForm.patch(route('admin.users.update', editForm.id), {
        onSuccess: () => {
            editModal.value.close();
            editForm.reset();
        }
    });
};

/**
 * 削除確認モーダルを開く
 */
const openDeleteModal = (user) => {
    deleteUserId.value = user.id;
    deleteUserName.value = user.name;
    deleteModal.value.showModal();
};

/**
 * ユーザー削除実行
 */
const deleteUser = () => {
    router.delete(route('admin.users.delete', deleteUserId.value), {
        onSuccess: () => {
            deleteModal.value.close();
            deleteUserId.value = null;
            deleteUserName.value = '';
        }
    });
};

/**
 * ロールバッジの色を取得
 */
const getRoleBadgeClass = (role) => {
    return role === 'admin' ? 'badge-secondary' : 'badge-primary';
};

/**
 * 認証状態のバッジクラスを取得
 */
const getVerificationBadgeClass = (verified) => {
    return verified ? 'badge-success' : 'badge-warning';
};
</script>

<template>
    <Head title="管理画面 - ユーザー管理" />

    <AdminLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                ユーザー管理
            </h2>
        </template>

        <!-- 検索・フィルター -->
        <div class="card bg-base-100 shadow-xl mb-6">
            <div class="card-body">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">検索</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="名前またはメールアドレス" 
                            class="input input-bordered" 
                            v-model="searchForm.search"
                            @keyup.enter="search"
                        />
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">ロール</span>
                        </label>
                        <select class="select select-bordered" v-model="searchForm.role">
                            <option value="">すべて</option>
                            <option 
                                v-for="option in role_options" 
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">&nbsp;</span>
                        </label>
                        <div class="flex space-x-2">
                            <button class="btn btn-primary" @click="search">
                                検索
                            </button>
                            <button class="btn btn-ghost" @click="resetFilters">
                                リセット
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ユーザー一覧 -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>名前</th>
                                <th>メールアドレス</th>
                                <th>ロール</th>
                                <th>認証状態</th>
                                <th>登録日時</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users.data" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td class="font-medium">{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>
                                    <div class="badge" :class="getRoleBadgeClass(user.role)">
                                        {{ user.role_label }}
                                    </div>
                                </td>
                                <td>
                                    <div 
                                        class="badge" 
                                        :class="getVerificationBadgeClass(user.email_verified_at)"
                                    >
                                        {{ user.email_verified_at ? '認証済み' : '未認証' }}
                                    </div>
                                </td>
                                <td class="text-sm text-gray-500">
                                    {{ user.created_at }}
                                </td>
                                <td>
                                    <div class="flex space-x-2">
                                        <button 
                                            class="btn btn-sm btn-primary"
                                            @click="openEditModal(user)"
                                        >
                                            編集
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-error"
                                            @click="openDeleteModal(user)"
                                        >
                                            削除
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <!-- データが無い場合 -->
                    <div v-if="users.data.length === 0" class="text-center py-8 text-gray-500">
                        ユーザーが見つかりませんでした
                    </div>
                </div>

                <!-- ページネーション -->
                <div class="flex justify-center mt-6" v-if="users.links && users.links.length > 3">
                    <div class="btn-group">
                        <Link
                            v-for="link in users.links"
                            :key="link.label"
                            :href="link.url"
                            :class="[
                                'btn',
                                link.active ? 'btn-active' : '',
                                !link.url ? 'btn-disabled' : ''
                            ]"
                            v-html="link.label"
                            preserve-state
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- 編集モーダル -->
        <dialog ref="editModal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">ユーザー編集</h3>
                
                <form @submit.prevent="updateUser" class="space-y-4 mt-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">名前</span>
                        </label>
                        <input 
                            type="text" 
                            class="input input-bordered" 
                            v-model="editForm.name"
                            :class="{ 'input-error': editForm.errors.name }"
                        />
                        <div v-if="editForm.errors.name" class="label">
                            <span class="label-text-alt text-error">{{ editForm.errors.name }}</span>
                        </div>
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">メールアドレス</span>
                        </label>
                        <input 
                            type="email" 
                            class="input input-bordered" 
                            v-model="editForm.email"
                            :class="{ 'input-error': editForm.errors.email }"
                        />
                        <div v-if="editForm.errors.email" class="label">
                            <span class="label-text-alt text-error">{{ editForm.errors.email }}</span>
                        </div>
                    </div>
                    
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">ロール</span>
                        </label>
                        <select 
                            class="select select-bordered" 
                            v-model="editForm.role"
                            :class="{ 'select-error': editForm.errors.role }"
                        >
                            <option 
                                v-for="option in role_options" 
                                :key="option.value"
                                :value="option.value"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                        <div v-if="editForm.errors.role" class="label">
                            <span class="label-text-alt text-error">{{ editForm.errors.role }}</span>
                        </div>
                    </div>
                    
                    <div class="modal-action">
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                            :class="{ loading: editForm.processing }"
                        >
                            更新
                        </button>
                        <button 
                            type="button" 
                            class="btn"
                            @click="editModal.close()"
                        >
                            キャンセル
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

        <!-- 削除確認モーダル -->
        <dialog ref="deleteModal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg text-error">ユーザー削除</h3>
                <p class="py-4">
                    ユーザー「{{ deleteUserName }}」を削除しますか？<br>
                    この操作は元に戻せません。
                </p>
                <div class="modal-action">
                    <button 
                        class="btn btn-error"
                        @click="deleteUser"
                    >
                        削除
                    </button>
                    <button 
                        class="btn"
                        @click="deleteModal.close()"
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </dialog>
    </AdminLayout>
</template>