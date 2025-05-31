import { ref } from 'vue'

// グローバル状態
const isDialogOpen = ref(false)
const dialogConfig = ref({
  title: '確認',
  message: '',
  acceptLabel: '受け入れる',
  rejectLabel: '拒否する'
})

let resolvePromise = null

export function useConfirmDialog() {
  const showConfirmDialog = (options = {}) => {
    return new Promise((resolve) => {
      dialogConfig.value = {
        title: options.title || '確認',
        message: options.message || '',
        acceptLabel: options.acceptLabel || '受け入れる',
        rejectLabel: options.rejectLabel || '拒否する'
      }
      
      resolvePromise = resolve
      isDialogOpen.value = true
    })
  }

  const handleAccept = () => {
    isDialogOpen.value = false
    if (resolvePromise) {
      resolvePromise(true)
      resolvePromise = null
    }
  }

  const handleReject = () => {
    isDialogOpen.value = false
    if (resolvePromise) {
      resolvePromise(false)
      resolvePromise = null
    }
  }

  return {
    isDialogOpen,
    dialogConfig,
    showConfirmDialog,
    handleAccept,
    handleReject
  }
}