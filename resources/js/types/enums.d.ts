// Auto-generated enum types from PHP Enums with EnumHelpers trait
// Do not modify this file manually

export type UserStatusValue = 'active' | 'inactive' | 'pending' | 'suspended';

export interface UserStatusItem {
  value: UserStatusValue;
  name: string;
  label: string;
}

export type UserStatusArray = UserStatusItem[];

export interface UserStatusOption {
  value: UserStatusValue;
  label: string;
}

export type UserStatusOptions = UserStatusOption[];

export interface AppEnums {
  UserStatus: UserStatusArray;
}

declare module '@inertiajs/vue3' {
  interface PageProps {
    enums: AppEnums;
  }
}