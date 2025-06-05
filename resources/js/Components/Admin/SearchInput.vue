<script setup>
import { ref, watch } from 'vue'

/**
 * 管理画面用検索入力コンポーネント
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** 検索値 */
  modelValue: {
    type: String,
    default: ''
  },
  /** プレースホルダー */
  placeholder: {
    type: String,
    default: '検索...'
  },
  /** ラベル */
  label: {
    type: String,
    default: ''
  }
})

/**
 * イベント定義
 */
const emit = defineEmits(['update:modelValue', 'search'])

/**
 * 内部状態
 */
const inputValue = ref(props.modelValue)

/**
 * 入力値の監視
 */
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

/**
 * 検索実行
 */
const handleSearch = () => {
  emit('search', inputValue.value)
}

/**
 * Enterキーでの検索
 */
const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}

/**
 * 検索クリア
 */
const clearSearch = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    
    <div class="input-group">
      <input
        v-model="inputValue"
        type="text"
        :placeholder="placeholder"
        class="input input-bordered w-full"
        @keydown="handleKeydown"
      />
      
      <button
        v-if="inputValue"
        @click="clearSearch"
        class="btn btn-square btn-outline"
        title="クリア"
      >
        ❌
      </button>
      
      <button
        @click="handleSearch"
        class="btn btn-square btn-primary"
        title="検索"
      >
        🔍
      </button>
    </div>
  </div>
</template>