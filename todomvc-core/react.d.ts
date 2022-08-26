import type { JSX as SolidJSX } from 'solid-js/types/jsx';

import type { AriaAttributes, DOMAttributes } from 'react' // not needed if skipLibCheck = true
export declare interface Ref<T> {
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
      xData?: unknown

    }
  }
}

declare global {
  interface JSX extends SolidJSX {
    onSubmit?: (e: SubmitEvent) => void
  }
}