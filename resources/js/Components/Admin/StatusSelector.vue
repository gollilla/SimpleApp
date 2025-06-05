<script setup>
import { ref, watch } from 'vue'

/**
 * 管理画面用ステータス選択コンポーネント
 */

/**
 * プロパティ定義
 */
const props = defineProps({
  /** 選択値 */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** 選択肢 */
  options: {
    type: Array,
    required: true
  },
  /** ラベル */
  label: {
    type: String,
    default: ''
  },
  /** プレースホルダー */
  placeholder: {
    type: String,
    default: '選択してください'
  }
})

/**
 * イベント定義
 */
const emit = defineEmits(['update:modelValue', 'change'])

/**
 * 内部状態
 */
const selectedValue = ref(props.modelValue)

/**
 * 選択値の監視
 */
watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue
})

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue)
  emit('change', newValue)
})
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    
    <select
      v-model="selectedValue"
      class="select select-bordered w-full"
    >
      <option 
        v-for="option in options" 
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>