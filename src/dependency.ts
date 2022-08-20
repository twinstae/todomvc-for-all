let _dependencies: Map<string, any> = new Map();

export function provide(key: string, value: any){
  _dependencies.set(key, value);
}

export function inject(key: string): any{
  return _dependencies.get(key);
}