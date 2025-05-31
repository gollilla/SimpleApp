// useConfirmDialog Composable Test
// 注意: このテストを実行するには、Vitest または Jest のセットアップが必要です

import { describe, it, expect, beforeEach } from 'vitest'
import { useConfirmDialog } from '../useConfirmDialog'

describe('useConfirmDialog', () => {
  let confirmDialog

  beforeEach(() => {
    confirmDialog = useConfirmDialog()
    confirmDialog.closeDialog() // 状態をリセット
  })

  it('初期状態が正しく設定される', () => {
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
    expect(confirmDialog.confirmDialogState.title).toBe('')
    expect(confirmDialog.confirmDialogState.message).toBe('')
    expect(confirmDialog.confirmDialogState.acceptLabel).toBe('受け入れる')
    expect(confirmDialog.confirmDialogState.rejectLabel).toBe('拒否する')
    expect(confirmDialog.confirmDialogState.resolve).toBe(null)
    expect(confirmDialog.confirmDialogState.reject).toBe(null)
  })

  it('confirm関数がデフォルト値で正しく動作する', () => {
    const promise = confirmDialog.confirm()

    expect(confirmDialog.confirmDialogState.isOpen).toBe(true)
    expect(confirmDialog.confirmDialogState.title).toBe('確認')
    expect(confirmDialog.confirmDialogState.message).toBe('実行してもよろしいですか？')
    expect(confirmDialog.confirmDialogState.acceptLabel).toBe('受け入れる')
    expect(confirmDialog.confirmDialogState.rejectLabel).toBe('拒否する')
    expect(promise).toBeInstanceOf(Promise)
  })

  it('confirm関数がカスタムオプションで正しく動作する', () => {
    const options = {
      title: 'カスタムタイトル',
      message: 'カスタムメッセージ',
      acceptLabel: 'はい',
      rejectLabel: 'いいえ'
    }

    confirmDialog.confirm(options)

    expect(confirmDialog.confirmDialogState.title).toBe('カスタムタイトル')
    expect(confirmDialog.confirmDialogState.message).toBe('カスタムメッセージ')
    expect(confirmDialog.confirmDialogState.acceptLabel).toBe('はい')
    expect(confirmDialog.confirmDialogState.rejectLabel).toBe('いいえ')
  })

  it('accept関数が正しく動作する', async () => {
    const promise = confirmDialog.confirm()
    
    confirmDialog.accept()

    await expect(promise).resolves.toBe(true)
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
  })

  it('reject関数が正しく動作する', async () => {
    const promise = confirmDialog.confirm()
    
    confirmDialog.reject()

    await expect(promise).rejects.toBe(false)
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
  })

  it('closeDialog関数が状態を正しくリセットする', () => {
    confirmDialog.confirm({
      title: 'テスト',
      message: 'テスト',
      acceptLabel: 'テスト',
      rejectLabel: 'テスト'
    })

    confirmDialog.closeDialog()

    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
    expect(confirmDialog.confirmDialogState.title).toBe('')
    expect(confirmDialog.confirmDialogState.message).toBe('')
    expect(confirmDialog.confirmDialogState.acceptLabel).toBe('受け入れる')
    expect(confirmDialog.confirmDialogState.rejectLabel).toBe('拒否する')
    expect(confirmDialog.confirmDialogState.resolve).toBe(null)
    expect(confirmDialog.confirmDialogState.reject).toBe(null)
  })

  it('複数のconfirmDialog インスタンスが同じ状態を共有する', () => {
    const confirmDialog1 = useConfirmDialog()
    const confirmDialog2 = useConfirmDialog()

    confirmDialog1.confirm({ title: 'テスト1' })

    expect(confirmDialog2.confirmDialogState.title).toBe('テスト1')
    expect(confirmDialog2.confirmDialogState.isOpen).toBe(true)
  })
})