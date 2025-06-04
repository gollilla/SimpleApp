import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useInertiaProps } from './useInertiaProps'
import { usePage } from '@inertiajs/vue3'

// usePage のモック
vi.mock('@inertiajs/vue3', () => ({
  usePage: vi.fn()
}))

describe('useInertiaProps', () => {
  const mockUsePage = vi.mocked(usePage)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return props, auth, user, and enums', () => {
    const mockProps = {
      auth: {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          email_verified_at: '2023-01-01T00:00:00.000000Z'
        }
      },
      enums: {
        UserStatus: [
          { value: 'active', name: 'ACTIVE', label: 'アクティブ' },
          { value: 'inactive', name: 'INACTIVE', label: '非アクティブ' },
          { value: 'pending', name: 'PENDING', label: '承認待ち' },
          { value: 'suspended', name: 'SUSPENDED', label: '停止中' }
        ]
      }
    }

    mockUsePage.mockReturnValue({
      props: mockProps
    } as any)

    const { props, auth, user, enums } = useInertiaProps()

    expect(props.value).toEqual(mockProps)
    expect(auth.value).toEqual(mockProps.auth)
    expect(user.value).toEqual(mockProps.auth.user)
    expect(enums.value).toEqual(mockProps.enums)
  })

  it('should handle missing enums gracefully', () => {
    const mockProps = {
      auth: {
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          email_verified_at: null
        }
      }
    }

    mockUsePage.mockReturnValue({
      props: mockProps
    } as any)

    const { enums } = useInertiaProps()

    expect(enums.value).toEqual({})
  })

  it('should return specific enum data', () => {
    const mockProps = {
      auth: { user: null },
      enums: {
        UserStatus: [
          { value: 'active', name: 'ACTIVE', label: 'アクティブ' },
          { value: 'inactive', name: 'INACTIVE', label: '非アクティブ' }
        ]
      }
    }

    mockUsePage.mockReturnValue({
      props: mockProps
    } as any)

    const { getEnum } = useInertiaProps()

    expect(getEnum('UserStatus')).toEqual(mockProps.enums.UserStatus)
    expect(getEnum('UserStatus')).toEqual(mockProps.enums.UserStatus)
  })

  it('should return enum options for select components', () => {
    const mockProps = {
      auth: { user: null },
      enums: {
        UserStatus: [
          { value: 'active', name: 'ACTIVE', label: 'アクティブ' },
          { value: 'inactive', name: 'INACTIVE', label: '非アクティブ' }
        ]
      }
    }

    mockUsePage.mockReturnValue({
      props: mockProps
    } as any)

    const { getEnumOptions, getUserStatusOptions } = useInertiaProps()

    const expectedOptions = [
      { value: 'active', label: 'アクティブ' },
      { value: 'inactive', label: '非アクティブ' }
    ]

    expect(getEnumOptions('UserStatus')).toEqual(expectedOptions)
    expect(getUserStatusOptions()).toEqual(expectedOptions)
  })
})