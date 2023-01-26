/// <reference types="vite/client" />

declare module "*.elm" {
	export const Elm: {
		App: {
			init: (options: {node: HTMLElement, flags: any }) => {
				ports: Record<string, { subscribe(json): void }>
			}
		}
	} 
}