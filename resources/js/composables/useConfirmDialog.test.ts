import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useConfirmDialog, type UseConfirmDialogReturn } from './useConfirmDialog'
import { nextTick } from 'vue'

describe('useConfirmDialog', () => {
  let composable: UseConfirmDialogReturn

  beforeEach(() => {
    composable = useConfirmDialog()
    // グローバル状態をリセット
    composable.isDialogOpen.value = false
    composable.dialogConfig.value = {
      title: '確認',
      message: '',
      acceptLabel: '受け入れる',
      rejectLabel: '拒否する'
    }
  })

  it('初期状態でダイアログが閉じている', () => {
    expect(composable.isDialogOpen.value).toBe(false)
  })

  it('showConfirmDialogでダイアログが開く', async () => {
    const promise: Promise<boolean> = composable.showConfirmDialog({
      message: 'テストメッセージ'
    })

    await nextTick()
    expect(composable.isDialogOpen.value).toBe(true)
    expect(composable.dialogConfig.value.message).toBe('テストメッセージ')

    composable.handleAccept()
    const result: boolean = await promise
    expect(result).toBe(true)
  })

  it('カスタムオプションが正しく設定される', async () => {
    composable.showConfirmDialog({
      title: 'カスタムタイトル',
      message: 'カスタムメッセージ',
      acceptLabel: 'はい',
      rejectLabel: 'いいえ'
    })

    await nextTick()
    
    expect(composable.dialogConfig.value.title).toBe('カスタムタイトル')
    expect(composable.dialogConfig.value.message).toBe('カスタムメッセージ')
    expect(composable.dialogConfig.value.acceptLabel).toBe('はい')
    expect(composable.dialogConfig.value.rejectLabel).toBe('いいえ')
  })

  it('handleAcceptでtrueが返される', async () => {
    const promise: Promise<boolean> = composable.showConfirmDialog({
      message: 'テスト'
    })

    composable.handleAccept()
    const result: boolean = await promise

    expect(result).toBe(true)
    expect(composable.isDialogOpen.value).toBe(false)
  })

  it('handleRejectでfalseが返される', async () => {
    const promise: Promise<boolean> = composable.showConfirmDialog({
      message: 'テスト'
    })

    composable.handleReject()
    const result: boolean = await promise

    expect(result).toBe(false)
    expect(composable.isDialogOpen.value).toBe(false)
  })

  it('デフォルト値が正しく設定される', async () => {
    composable.showConfirmDialog({
      message: 'テスト'
    })

    await nextTick()
    
    expect(composable.dialogConfig.value.title).toBe('確認')
    expect(composable.dialogConfig.value.acceptLabel).toBe('受け入れる')
    expect(composable.dialogConfig.value.rejectLabel).toBe('拒否する')
  })
})

describe('useConfirmDialog DOM integration', () => {
  beforeEach(() => {
    // グローバル状態をリセット
    const composable = useConfirmDialog()
    composable.isDialogOpen.value = false
    composable.dialogConfig.value = {
      title: '確認',
      message: '',
      acceptLabel: '受け入れる',
      rejectLabel: '拒否する'
    }
  })

  const TestComponent = {
    template: `
      <div>
        <button @click="showDialog" data-testid="trigger">テストボタン</button>
        <div v-if="isDialogOpen" data-testid="dialog" role="dialog">
          <p data-testid="dialog-message">{{ dialogConfig.message }}</p>
          <button @click="handleAccept" data-testid="accept">{{ dialogConfig.acceptLabel }}</button>
          <button @click="handleReject" data-testid="reject">{{ dialogConfig.rejectLabel }}</button>
        </div>
      </div>
    `,
    setup() {
      const { isDialogOpen, dialogConfig, showConfirmDialog, handleAccept, handleReject } = useConfirmDialog()
      
      const showDialog = (): void => {
        showConfirmDialog({
          message: 'DOM テストメッセージ',
          acceptLabel: 'OK',
          rejectLabel: 'Cancel'
        })
      }
      
      return {
        isDialogOpen,
        dialogConfig,
        showDialog,
        handleAccept,
        handleReject
      }
    }
  }

  it('ダイアログが正しくDOMに表示される', async () => {
    const wrapper = mount(TestComponent)
    
    expect(wrapper.find('[data-testid="dialog"]').exists()).toBe(false)
    
    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    
    expect(wrapper.find('[data-testid="dialog"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="dialog-message"]').text()).toBe('DOM テストメッセージ')
    expect(wrapper.find('[data-testid="accept"]').text()).toBe('OK')
    expect(wrapper.find('[data-testid="reject"]').text()).toBe('Cancel')
  })

  it('Acceptボタンクリックでダイアログが閉じる', async () => {
    const wrapper = mount(TestComponent)
    
    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    
    expect(wrapper.find('[data-testid="dialog"]').exists()).toBe(true)
    
    await wrapper.find('[data-testid="accept"]').trigger('click')
    await nextTick()
    
    expect(wrapper.find('[data-testid="dialog"]').exists()).toBe(false)
  })

  it('Rejectボタンクリックでダイアログが閉じる', async () => {
    const wrapper = mount(TestComponent)
    
    await wrapper.find('[data-testid="trigger"]').trigger('click')
    await nextTick()
    
    expect(wrapper.find('[data-testid="dialog"]').exists()).toBe(true)
    
    await wrapper.find('[data-testid="reject"]').trigger('click')
    await nextTick()
    
    expect(wrapper.find('[data-testid="dialog"]').exists()).toBe(false)
  })
})