import { usePage } from '@inertiajs/vue3'
import type { AppEnums } from '@/types/enums'

export function useEnums() {
  const page = usePage()
  const enums = page.props.enums as AppEnums

  return {
    enums,
    getUserStatusOptions: () => enums.UserStatus.map(item => ({
      value: item.value,
      label: item.label
    }))
  }
}