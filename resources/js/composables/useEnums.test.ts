import { describe, it, expect, vi } from 'vitest'
import { useEnums } from './useEnums'

// usePage のモック
vi.mock('@inertiajs/vue3', () => ({
  usePage: () => ({
    props: {
      enums: {
        UserStatus: [
          { value: 'active', name: 'ACTIVE', label: 'アクティブ' },
          { value: 'inactive', name: 'INACTIVE', label: '非アクティブ' },
          { value: 'pending', name: 'PENDING', label: '承認待ち' },
          { value: 'suspended', name: 'SUSPENDED', label: '停止中' }
        ]
      }
    }
  })
}))

describe('useEnums', () => {
  it('enumsプロパティが正しく返される', () => {
    const { enums } = useEnums()
    
    expect(enums).toBeDefined()
    expect(enums.UserStatus).toHaveLength(4)
    expect(enums.UserStatus[0]).toEqual({
      value: 'active',
      name: 'ACTIVE',
      label: 'アクティブ'
    })
  })

  it('getUserStatusOptionsが正しいオプション配列を返す', () => {
    const { getUserStatusOptions } = useEnums()
    const options = getUserStatusOptions()
    
    expect(options).toHaveLength(4)
    expect(options[0]).toEqual({
      value: 'active',
      label: 'アクティブ'
    })
    expect(options[1]).toEqual({
      value: 'inactive',
      label: '非アクティブ'
    })
  })
})