/// <reference types="vite/client" />

declare module "*.elm" {
	type ElmApp = {
		init: (options: {node: HTMLElement, flags: any }) => {
			ports: Record<string, { subscribe(callback: (data) => void ): void, send(data): void }>,
		}
	}
	export const Elm: {
		App: ElmApp,
		AppWithExternal: ElmApp
	} 
}