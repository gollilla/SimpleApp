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
  },
  /** ステータスラベル */
  label: {
    type: String,
    required: true
  }
})

/**
 * ステータスのラベル取得
 */
const statusLabel = computed(() => {
  return props.label
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
  <div class="badge whitespace-nowrap" :class="badgeClass">
    <span class="mr-1">{{ statusIcon }}</span>
    {{ statusLabel }}
  </div>
</template>