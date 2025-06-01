import { ref, type Ref } from 'vue'

// 型定義
export interface DialogConfig {
  title: string
  message: string
  acceptLabel: string
  rejectLabel: string
}

export interface ConfirmDialogOptions {
  title?: string
  message?: string
  acceptLabel?: string
  rejectLabel?: string
}

export interface UseConfirmDialogReturn {
  isDialogOpen: Ref<boolean>
  dialogConfig: Ref<DialogConfig>
  showConfirmDialog: (_options?: ConfirmDialogOptions) => Promise<boolean>
  handleAccept: () => void
  handleReject: () => void
}

// グローバル状態
const isDialogOpen = ref<boolean>(false)
const dialogConfig = ref<DialogConfig>({
  title: '確認',
  message: '',
  acceptLabel: '受け入れる',
  rejectLabel: '拒否する'
})

let resolvePromise: ((_value: boolean) => void) | null = null

export function useConfirmDialog(): UseConfirmDialogReturn {
  const showConfirmDialog = (_options: ConfirmDialogOptions = {}): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      dialogConfig.value = {
        title: _options.title || '確認',
        message: _options.message || '',
        acceptLabel: _options.acceptLabel || '受け入れる',
        rejectLabel: _options.rejectLabel || '拒否する'
      }
      
      resolvePromise = resolve
      isDialogOpen.value = true
    })
  }

  const handleAccept = (): void => {
    isDialogOpen.value = false
    if (resolvePromise) {
      resolvePromise(true)
      resolvePromise = null
    }
  }

  const handleReject = (): void => {
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