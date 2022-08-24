import type { AriaAttributes, DOMAttributes } from 'react' // not needed if skipLibCheck = true
export declare interface Ref<T = any> {
  value: T;
}

declare global {
  namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      ref?: Ref
      for?: string
      class?: string
      ariaLabel?: string
      onSubmit?: (e: SubmitEvent) => void
      onKeyup?: (e: KeyboardEvent) => void
      onChange?: (e: ChangeEvent) => void
    }
  }
}