import { DefineComponent } from 'vue'

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
}

export interface EnumValue {
  value: string;
  name: string;
  label: string;
}

export interface Enums {
  UserStatus: EnumValue[];
}

export interface PageProps {
  auth: {
    user: User | null;
  };
  enums?: Enums;
  [key: string]: any;
}

declare module 'laravel-vite-plugin/inertia-helpers' {
  export function resolvePageComponent(
    path: string,
    pages: Record<string, () => Promise<{ default: DefineComponent }>>
  ): Promise<DefineComponent>;
}
