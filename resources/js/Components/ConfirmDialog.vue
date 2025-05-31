<script setup>
import { useTemplateRef, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '確認'
  },
  message: {
    type: String,
    required: true
  },
  acceptLabel: {
    type: String,
    default: '受け入れる'
  },
  rejectLabel: {
    type: String,
    default: '拒否する'
  }
})

const emit = defineEmits(['accept', 'reject'])

const dialogRef = useTemplateRef('dialog')

const handleAccept = () => {
  emit('accept')
  closeDialog()
}

const handleReject = () => {
  emit('reject')
  closeDialog()
}

const closeDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.close()
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
  }
}

watch(() => props.isOpen, (newValue) => {
  if (newValue && dialogRef.value) {
    dialogRef.value.showModal()
    // ダイアログにフォーカスを設定
    dialogRef.value.focus()
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