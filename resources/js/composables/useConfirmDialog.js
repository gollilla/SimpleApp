import { ref, reactive } from 'vue'

const confirmDialogState = reactive({
  isOpen: false,
  title: '',
  message: '',
  acceptLabel: '受け入れる',
  rejectLabel: '拒否する',
  resolve: null,
  reject: null
})

export function useConfirmDialog() {
  const confirm = (options = {}) => {
    const {
      title = '確認',
      message = '実行してもよろしいですか？',
      acceptLabel = '受け入れる',
      rejectLabel = '拒否する'
    } = options

    return new Promise((resolve, reject) => {
      confirmDialogState.isOpen = true
      confirmDialogState.title = title
      confirmDialogState.message = message
      confirmDialogState.acceptLabel = acceptLabel
      confirmDialogState.rejectLabel = rejectLabel
      confirmDialogState.resolve = resolve
      confirmDialogState.reject = reject
    })
  }

  const accept = () => {
    if (confirmDialogState.resolve) {
      confirmDialogState.resolve(true)
    }
    closeDialog()
  }

  const reject = () => {
    if (confirmDialogState.reject) {
      confirmDialogState.reject(false)
    }
    closeDialog()
  }

  const closeDialog = () => {
    confirmDialogState.isOpen = false
    confirmDialogState.title = ''
    confirmDialogState.message = ''
    confirmDialogState.acceptLabel = '受け入れる'
    confirmDialogState.rejectLabel = '拒否する'
    confirmDialogState.resolve = null
    confirmDialogState.reject = null
  }

  return {
    confirmDialogState,
    confirm,
    accept,
    reject,
    closeDialog
  }
}