import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import { PageProps, Enums, EnumValue } from '@/types/inertia'

export function useInertiaProps() {
  const page = usePage<PageProps>()

  const props = computed(() => page.props)
  const auth = computed(() => props.value.auth)
  const user = computed(() => auth.value.user)
  const enums = computed(() => props.value.enums || {} as Enums)

  // 特定のEnumを取得するヘルパー関数
  const getEnum = <K extends keyof Enums>(enumName: K): EnumValue[] => {
    return enums.value[enumName] || []
  }

  // Enumをオプション形式で取得（select用）
  const getEnumOptions = <K extends keyof Enums>(enumName: K) => {
    const enumData = getEnum(enumName)
    return enumData.map((item: EnumValue) => ({
      value: item.value,
      label: item.label
    }))
  }

  // UserStatusのオプションを取得（既存のEnumに対応）
  const getUserStatusOptions = () => {
    return getEnumOptions('UserStatus')
  }

  return {
    props,
    auth,
    user,
    enums,
    getEnum,
    getEnumOptions,
    getUserStatusOptions
  }
}