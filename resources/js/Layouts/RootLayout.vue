<script setup>
// 今後、ナビゲーションバーなどの共通部品が追加される予定
</script>

<template>
    <div class="min-h-screen bg-base-100">
        <!-- 将来的にナビゲーションバーが追加される場所 -->
        
        <!-- メインコンテンツエリア -->
        <main class="container mx-auto">
            <slot />
        </main>
    </div>
</template>