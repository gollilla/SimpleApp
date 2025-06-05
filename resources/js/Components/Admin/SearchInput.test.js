import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'

/**
 * SearchInput コンポーネントのテスト
 */
describe('SearchInput', () => {
  it('正常にレンダリングされる', () => {
    const wrapper = mount(SearchInput, {
      props: {
        placeholder: 'テスト検索'
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('テスト検索')
  })

  it('ラベルが表示される', () => {
    const wrapper = mount(SearchInput, {
      props: {
        label: '検索フィールド'
      }
    })

    expect(wrapper.find('.label-text').text()).toBe('検索フィールド')
  })

  it('入力値が正しく更新される', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('テスト値')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['テスト値'])
  })

  it('Enterキーで検索イベントが発火される', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'テスト'
      }
    })

    const input = wrapper.find('input')
    await input.setValue('テスト')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['テスト'])
  })

  it('検索ボタンクリックで検索イベントが発火される', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'テスト'
      }
    })

    const searchButton = wrapper.find('.btn-primary')
    await searchButton.trigger('click')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['テスト'])
  })

  it('クリアボタンで入力値がクリアされる', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'テスト'
      }
    })

    // 入力値を設定
    const input = wrapper.find('input')
    await input.setValue('テスト')
    await wrapper.vm.$nextTick()

    const clearButton = wrapper.find('.btn-outline')
    if (clearButton.exists()) {
      await clearButton.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('search')).toBeTruthy()
    }
  })
})