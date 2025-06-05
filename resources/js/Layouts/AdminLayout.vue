<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link, usePage } from '@inertiajs/vue3';

/**
 * 管理画面レイアウトコンポーネント
 * DaisyUIを使用したサイドバー付きレイアウト
 */

const page = usePage();
const sidebarOpen = ref(false);

/**
 * サイドバーのメニュー項目
 */
const menuItems = [
    {
        name: 'ダッシュボード',
        href: 'admin.dashboard',
        icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'
    },
    {
        name: 'ユーザー管理',
        href: 'admin.users', 
        icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
    }
];

/**
 * サイドバートグル
 */
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

/**
 * メニュー項目がアクティブかチェック
 */
const isActive = (routeName) => {
    return route().current(routeName);
};
</script>

<template>
    <div class="min-h-screen bg-base-200">
        <!-- ナビゲーションバー -->
        <div class="navbar bg-base-100 shadow-sm">
            <div class="navbar-start">
                <!-- サイドバートグル（モバイル用） -->
                <div class="dropdown lg:hidden">
                    <label tabindex="0" class="btn btn-ghost btn-circle" @click="toggleSidebar">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                
                <!-- ロゴ -->
                <Link :href="route('admin.dashboard')" class="btn btn-ghost text-xl">
                    <ApplicationLogo class="w-8 h-8" />
                    <span class="ml-2">管理画面</span>
                </Link>
            </div>
            
            <div class="navbar-end">
                <!-- ユーザーメニュー -->
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                            {{ page.props.auth.user.name.charAt(0) }}
                        </div>
                    </label>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li class="menu-title">
                            <span>{{ page.props.auth.user.name }}</span>
                        </li>
                        <li><Link :href="route('dashboard')">一般画面に戻る</Link></li>
                        <li><Link :href="route('profile.edit')">プロフィール</Link></li>
                        <li><Link :href="route('logout')" method="post" as="button">ログアウト</Link></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="flex">
            <!-- サイドバー -->
            <div class="drawer-side lg:relative lg:block" :class="{ 'fixed inset-0 z-40': sidebarOpen }">
                <!-- オーバーレイ（モバイル用） -->
                <label class="drawer-overlay lg:hidden" @click="sidebarOpen = false" v-if="sidebarOpen"></label>
                
                <aside class="w-64 min-h-full bg-base-100 shadow-sm">
                    <div class="p-4">
                        <ul class="menu p-0 space-y-1">
                            <li v-for="item in menuItems" :key="item.href">
                                <Link 
                                    :href="route(item.href)"
                                    :class="[
                                        'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium',
                                        isActive(item.href) 
                                            ? 'bg-primary text-primary-content' 
                                            : 'text-base-content hover:bg-base-200'
                                    ]"
                                    @click="sidebarOpen = false"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path :d="item.icon" />
                                    </svg>
                                    <span>{{ item.name }}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>

            <!-- メインコンテンツ -->
            <div class="flex-1 min-h-screen">
                <!-- ページヘッダー -->
                <header class="bg-base-100 shadow-sm" v-if="$slots.header">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <slot name="header" />
                    </div>
                </header>

                <!-- ページコンテンツ -->
                <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot />
                </main>
            </div>
        </div>

        <!-- モバイル用オーバーレイ -->
        <div 
            v-if="sidebarOpen" 
            class="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden"
            @click="sidebarOpen = false"
        ></div>
    </div>
</template>