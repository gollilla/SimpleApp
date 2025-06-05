<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div>
        <div class="min-h-screen bg-base-200">
            <!-- Navigation -->
            <div class="navbar bg-base-100 shadow-lg">
                <div class="navbar-start">
                    <!-- Mobile menu button -->
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path>
                            </svg>
                        </div>
                        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link :href="route('admin.dashboard')" :class="{ 'active': route().current('admin.dashboard') }">ダッシュボード</Link></li>
                            <li><Link :href="route('admin.users.index')" :class="{ 'active': route().current('admin.users.*') }">ユーザー管理</Link></li>
                        </ul>
                    </div>
                    <!-- Logo -->
                    <Link :href="route('admin.dashboard')" class="btn btn-ghost text-xl">
                        <ApplicationLogo class="w-8 h-8" />
                        管理画面
                    </Link>
                </div>

                <!-- Desktop menu -->
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal px-1">
                        <li><Link :href="route('admin.dashboard')" :class="{ 'active': route().current('admin.dashboard') }">ダッシュボード</Link></li>
                        <li><Link :href="route('admin.users.index')" :class="{ 'active': route().current('admin.users.*') }">ユーザー管理</Link></li>
                    </ul>
                </div>

                <!-- User dropdown -->
                <div class="navbar-end">
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                {{ $page.props.auth.user.name.charAt(0).toUpperCase() }}
                            </div>
                        </div>
                        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li class="menu-title">{{ $page.props.auth.user.name }}</li>
                            <li><Link :href="route('dashboard')">通常ダッシュボード</Link></li>
                            <li><Link :href="route('profile.edit')">プロフィール</Link></li>
                            <li><Link :href="route('logout')" method="post" as="button">ログアウト</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Page Content -->
            <main class="container mx-auto p-4">
                <!-- Page Header -->
                <header v-if="$slots.header" class="mb-6">
                    <div class="bg-base-100 shadow rounded-lg p-6">
                        <slot name="header" />
                    </div>
                </header>

                <!-- Main Content -->
                <div class="bg-base-100 shadow rounded-lg p-6">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.menu li a.active {
    @apply bg-primary text-primary-content;
}
</style>