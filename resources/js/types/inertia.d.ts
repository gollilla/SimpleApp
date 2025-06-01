import { DefineComponent } from 'vue'

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
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
