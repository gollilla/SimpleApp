import { AxiosInstance } from 'axios'
import { DefineComponent } from 'vue'

declare global {
  interface Window {
    axios: AxiosInstance
  }
  
  interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
    glob(_pattern: string): Record<string, () => Promise<{ default: DefineComponent }>>
  }
}

export {}