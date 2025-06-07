import { DefineComponent } from 'vue'

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role?: UserRole;
  status?: UserStatus;
}

export interface PageProps {
  auth: {
    user: User;
  };
  [key: string]: any;
}

declare module 'laravel-vite-plugin/inertia-helpers' {
  export function resolvePageComponent(
    path: string,
    pages: Record<string, () => Promise<{ default: DefineComponent }>>
  ): Promise<DefineComponent>;
}
