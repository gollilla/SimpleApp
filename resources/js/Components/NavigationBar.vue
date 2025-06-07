<template>
    <div class="navbar bg-base-100 shadow-lg">
        <div class="navbar-start">
            <Link :href="homeRoute" class="btn btn-ghost text-xl">{{ brandLogo }}</Link>
        </div>
        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <div 
                    tabindex="0" 
                    role="button" 
                    class="btn btn-square btn-ghost"
                    data-testid="menu-button"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        class="inline-block h-5 w-5 stroke-current"
                    >
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </div>
                <ul 
                    tabindex="0" 
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    data-testid="menu-items"
                >
                    <!-- 管理者メニュー -->
                    <template v-if="isAdmin">
                        <li><Link :href="route('admin.dashboard')">📊 ダッシュボード</Link></li>
                        <li><Link :href="route('admin.users.index')">👥 ユーザー管理</Link></li>
                        <li><Link :href="route('admin.settings.index')">⚙️ システム設定</Link></li>
                        <li><hr /></li>
                        <li><Link :href="route('admin.reports.users')">📈 ユーザーレポート</Link></li>
                        <li><Link :href="route('admin.reports.system')">🖥️ システムレポート</Link></li>
                        <li><hr /></li>
                    </template>
                    
                    <!-- 一般ユーザーメニュー -->
                    <template v-else>
                        <li><Link :href="route('dashboard')">🏠 ダッシュボード</Link></li>
                        <li><Link :href="route('mypage')">📋 マイページ</Link></li>
                        <li><hr /></li>
                    </template>
                    
                    <!-- 共通メニュー -->
                    <li>
                        <Link :href="route('profile.edit')" class="text-info">👤 プロフィール</Link>
                    </li>
                    <li>
                        <Link :href="route('logout')" method="post" as="button" class="text-error">
                            🚪 ログアウト
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import type { PageProps } from '@/types/inertia'

interface Props {
    brandLogo?: string;
}

withDefaults(defineProps<Props>(), {
    brandLogo: 'SimpleApp'
});

// ページプロパティからユーザー情報を取得
const page = usePage<PageProps>();

/**
 * ユーザーが管理者かどうかを判定
 */
const isAdmin = computed(() => {
    return page.props.auth.user?.role === 'admin';
});

/**
 * ホームルートを取得（ロールに応じて変更）
 */
const homeRoute = computed(() => {
    return isAdmin.value ? route('admin.dashboard') : route('dashboard');
});
</script>