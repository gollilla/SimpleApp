<script setup>
import ConfirmDialog from '@/Components/ConfirmDialog.vue'
import NavigationBar from '@/Components/NavigationBar.vue'
import { useConfirmDialog } from '@/composables/useConfirmDialog.js'

const { isDialogOpen, dialogConfig, handleAccept, handleReject } = useConfirmDialog()
</script>

<template>
    <div class="min-h-screen bg-base-100">
        <!-- ナビゲーションバー -->
        <NavigationBar />
        
        <!-- メインコンテンツエリア -->
        <main class="container mx-auto">
            <slot />
        </main>
        
        <!-- 確認ダイアログ -->
        <ConfirmDialog
            :is-open="isDialogOpen"
            :title="dialogConfig.title"
            :message="dialogConfig.message"
            :accept-label="dialogConfig.acceptLabel"
            :reject-label="dialogConfig.rejectLabel"
            @accept="handleAccept"
            @reject="handleReject"
        />
    </div>
</template>