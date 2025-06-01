<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'

// 型定義
interface Props {
  isOpen?: boolean
  title?: string
  message: string
  acceptLabel?: string
  rejectLabel?: string
}

interface Emits {
  accept: []
  reject: []
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: '確認',
  acceptLabel: '受け入れる',
  rejectLabel: '拒否する'
})

const emit = defineEmits<Emits>()

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')
const rejectButtonRef = useTemplateRef<HTMLButtonElement>('rejectButton')

const handleAccept = (): void => {
  emit('accept')
  closeDialog()
}

const handleReject = (): void => {
  emit('reject')
  closeDialog()
}

const closeDialog = (): void => {
  if (dialogRef.value) {
    dialogRef.value.close()
  }
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    handleReject()
  }
}

watch(() => props.isOpen, (newValue: boolean) => {
  if (newValue && dialogRef.value) {
    dialogRef.value.showModal()
    setTimeout(() => {
      if (rejectButtonRef.value) {
        rejectButtonRef.value.focus()
      }
    }, 100)
  } else if (!newValue && dialogRef.value) {
    dialogRef.value.close()
  }
}, { immediate: true })
</script>

<template>
  <dialog
    ref="dialog"
    class="modal"
    @keydown="handleKeydown"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action">
        <button 
          ref="rejectButton"
          class="btn btn-error"
          @click="handleReject"
        >
          {{ rejectLabel }}
        </button>
        <button 
          class="btn btn-primary"
          @click="handleAccept"
        >
          {{ acceptLabel }}
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="handleReject">close</button>
    </form>
  </dialog>
</template>