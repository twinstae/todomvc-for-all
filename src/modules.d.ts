declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}


declare module '*.svelte' {
  import { SvelteComponent } from "svelte";
  export default SvelteComponent
}


declare module '*.html?raw' {
  export default string
}