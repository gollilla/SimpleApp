<script setup lang="ts">
import RootLayout from '@/Layouts/RootLayout.vue';
import UserStatusBadge from '@/Components/Admin/UserStatusBadge.vue';
import { Head } from '@inertiajs/vue3';
import type { UserRole, UserStatus } from '@/types/inertia';

/**
 * マイページのプロパティ定義
 */
interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: UserRole;
        status: UserStatus;
        created_at: string;
        email_verified_at: string | null;
    };
}

defineProps<Props>();

/**
 * ロールの日本語表示を取得
 * @param role ユーザーロール
 * @returns 日本語のロール名
 */
const getRoleDisplay = (role: UserRole): string => {
    const roleMap: Record<UserRole, string> = {
        admin: '管理者',
        moderator: 'モデレーター',
        user: '一般ユーザー',
        guest: 'ゲスト'
    };
    return roleMap[role] || role;
};
</script>

<template>
    <Head title="マイページ" />

    <RootLayout>
        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <!-- ページヘッダー -->
                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    マイページ
                </h1>
                <!-- プロフィール情報 -->
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            プロフィール情報
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    名前
                                </label>
                                <p class="mt-1 text-base text-gray-900 dark:text-gray-100">
                                    {{ user.name }}
                                </p>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    メールアドレス
                                </label>
                                <p class="mt-1 text-base text-gray-900 dark:text-gray-100">
                                    {{ user.email }}
                                </p>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    ロール
                                </label>
                                <p class="mt-1 text-base text-gray-900 dark:text-gray-100">
                                    {{ getRoleDisplay(user.role) }}
                                </p>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    ステータス
                                </label>
                                <div class="mt-1">
                                    <UserStatusBadge :status="user.status" />
                                </div>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    登録日
                                </label>
                                <p class="mt-1 text-base text-gray-900 dark:text-gray-100">
                                    {{ user.created_at }}
                                </p>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    メール認証日時
                                </label>
                                <p class="mt-1 text-base text-gray-900 dark:text-gray-100">
                                    {{ user.email_verified_at || '未認証' }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- アクティビティ -->
                <div class="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            最近のアクティビティ
                        </h3>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p>アクティビティ機能は今後実装予定です。</p>
                        </div>
                    </div>
                </div>

                <!-- 統計情報 -->
                <div class="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            統計情報
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <p class="text-sm text-gray-600 dark:text-gray-400">ログイン回数</p>
                                <p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    -
                                </p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <p class="text-sm text-gray-600 dark:text-gray-400">最終ログイン</p>
                                <p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    -
                                </p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <p class="text-sm text-gray-600 dark:text-gray-400">アカウント使用日数</p>
                                <p class="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    -
                                </p>
                            </div>
                        </div>
                        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            <p>統計機能は今後実装予定です。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </RootLayout>
</template>