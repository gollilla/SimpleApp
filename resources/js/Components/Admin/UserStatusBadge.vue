<script setup>
import { computed } from 'vue'

/**
 * ユーザーステータス表示バッジコンポーネント
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** ステータス値 */
  status: {
    type: String,
    required: true
  }
})

/**
 * ステータスのラベル取得
 */
const statusLabel = computed(() => {
  const statusLabels = {
    'active': 'アクティブ',
    'inactive': '非アクティブ',
    'pending': '承認待ち',
    'suspended': '停止中'
  }
  return statusLabels[props.status] || props.status
})

/**
 * ステータスのバッジ色取得
 */
const badgeClass = computed(() => {
  const statusClasses = {
    'active': 'badge-success',
    'inactive': 'badge-neutral',
    'pending': 'badge-warning',
    'suspended': 'badge-error'
  }
  return statusClasses[props.status] || 'badge-neutral'
})

/**
 * ステータスアイコン取得
 */
const statusIcon = computed(() => {
  const statusIcons = {
    'active': '✅',
    'inactive': '⚪',
    'pending': '⏳',
    'suspended': '🚫'
  }
  return statusIcons[props.status] || '❓'
})
</script>

<template>
  <div class="badge" :class="badgeClass">
    <span class="mr-1">{{ statusIcon }}</span>
    {{ statusLabel }}
  </div>
</template>