import { inject, provide } from "vue";

export default function createDependency<T>(name: string): [string, () => T, (impl: () => T) => void]{
  const key = name;

  function provideDependency(impl: () => T){
    provide(key, impl)
  }

  function useDependency(): T {
    const impl = inject<() => T>(key)

    if(impl === undefined){
      throw Error(name + '구현체가 없습니다!')
    }
    return impl();
  }

  return [key, useDependency, provideDependency];
}