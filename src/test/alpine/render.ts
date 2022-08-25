import alpine from 'alpinejs'

interface Alpine {
  default: typeof alpine
}

export interface TestWindow extends Window {
  Alpine: typeof alpine
}

declare let window: TestWindow;

export function render(html: string){

  if (window.Alpine === undefined){
    document.body.innerHTML = html
    const { default: Alpine } = (alpine as unknown) as Alpine
    window.Alpine = Alpine;
    Alpine.start()
  }
}