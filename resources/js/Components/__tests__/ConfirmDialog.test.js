// ConfirmDialog Component Test
// 注意: このテストを実行するには、Vitest または Jest のセットアップが必要です

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ConfirmDialog from '../ConfirmDialog.vue'
import { useConfirmDialog } from '../../composables/useConfirmDialog'

describe('ConfirmDialog', () => {
  let wrapper
  let confirmDialog

  beforeEach(() => {
    confirmDialog = useConfirmDialog()
    wrapper = mount(ConfirmDialog)
  })

  afterEach(() => {
    wrapper?.unmount()
    confirmDialog.closeDialog()
  })

  it('初期状態では表示されていない', () => {
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
    expect(wrapper.find('.modal').exists()).toBe(false)
  })

  it('confirm関数呼び出し時にダイアログが表示される', async () => {
    confirmDialog.confirm({
      title: 'テストタイトル',
      message: 'テストメッセージ',
      acceptLabel: 'はい',
      rejectLabel: 'いいえ'
    })

    await nextTick()

    expect(confirmDialog.confirmDialogState.isOpen).toBe(true)
    expect(wrapper.find('.modal-box h3').text()).toBe('テストタイトル')
    expect(wrapper.find('.modal-box p').text()).toBe('テストメッセージ')
  })

  it('カスタムボタンラベルが正しく表示される', async () => {
    confirmDialog.confirm({
      acceptLabel: 'カスタム受け入れ',
      rejectLabel: 'カスタム拒否'
    })

    await nextTick()

    const buttons = wrapper.findAll('.modal-action button')
    expect(buttons[0].text()).toBe('カスタム拒否')
    expect(buttons[1].text()).toBe('カスタム受け入れ')
  })

  it('受け入れボタンクリック時にPromiseがresolveされる', async () => {
    const promise = confirmDialog.confirm({ message: 'テスト' })
    
    await nextTick()
    
    const acceptButton = wrapper.find('.btn-primary')
    await acceptButton.trigger('click')

    await expect(promise).resolves.toBe(true)
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
  })

  it('拒否ボタンクリック時にPromiseがrejectされる', async () => {
    const promise = confirmDialog.confirm({ message: 'テスト' })
    
    await nextTick()
    
    const rejectButton = wrapper.find('.btn-outline')
    await rejectButton.trigger('click')

    await expect(promise).rejects.toBe(false)
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
  })

  it('背景クリック時にダイアログが閉じられる', async () => {
    const promise = confirmDialog.confirm({ message: 'テスト' })
    
    await nextTick()
    
    const backdrop = wrapper.find('.modal-backdrop')
    await backdrop.trigger('click')

    await expect(promise).rejects.toBe(false)
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
  })

  it('ESCキー押下時にダイアログが閉じられる', async () => {
    const promise = confirmDialog.confirm({ message: 'テスト' })
    
    await nextTick()

    // ESCキーイベントをシミュレート
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)

    await expect(promise).rejects.toBe(false)
    expect(confirmDialog.confirmDialogState.isOpen).toBe(false)
  })

  it('デフォルトのラベルとタイトルが使用される', async () => {
    confirmDialog.confirm()

    await nextTick()

    expect(wrapper.find('.modal-box h3').text()).toBe('確認')
    expect(wrapper.find('.modal-box p').text()).toBe('実行してもよろしいですか？')
    
    const buttons = wrapper.findAll('.modal-action button')
    expect(buttons[0].text()).toBe('拒否する')
    expect(buttons[1].text()).toBe('受け入れる')
  })
})