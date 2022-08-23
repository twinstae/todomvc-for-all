export function createContainer<T extends Record<string, any>>(initDependencies: T) {
  let _dependencies: T = initDependencies;
  
  type DependencyT = typeof _dependencies;
  
  function provide<K extends keyof DependencyT>(key: K, value: DependencyT[K]){
    _dependencies[key] = value;
  }
  
  function inject<K extends keyof DependencyT>(key: K): DependencyT[K]{
    return _dependencies[key];
  }

  return {
    provide,
    inject,
  }
}