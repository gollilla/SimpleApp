<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

const { confirmDialogState, accept, reject } = useConfirmDialog()

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && confirmDialogState.isOpen) {
    event.preventDefault()
    reject()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<template>
  <dialog 
    :open="confirmDialogState.isOpen" 
    class="modal modal-open"
    v-if="confirmDialogState.isOpen"
  >
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">
        {{ confirmDialogState.title }}
      </h3>
      
      <p class="py-4">
        {{ confirmDialogState.message }}
      </p>
      
      <div class="modal-action">
        <button 
          @click="reject"
          class="btn btn-outline"
        >
          {{ confirmDialogState.rejectLabel }}
        </button>
        
        <button 
          @click="accept"
          class="btn btn-primary"
        >
          {{ confirmDialogState.acceptLabel }}
        </button>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div class="modal-backdrop" @click="reject">
      <button>close</button>
    </div>
  </dialog>
</template>