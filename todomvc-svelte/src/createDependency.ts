import { getContext, setContext } from "svelte";

export function createDependency<T>(key: string | symbol): [
  () => T,
  (impl: T) => void,
  string | symbol
]{
  
  return [
    () => getContext(key),
    (impl) => setContext(key, impl),
    key,
  ]
}