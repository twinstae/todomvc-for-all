/* eslint-disable @typescript-eslint/no-explicit-any */


export type AsAction<T, I extends Record<string, (old: T, ...args: any[]) => T>> = {
  [K in keyof I]: I[K] extends (old: T, ...args: infer A) => T ? (...args: A) => void : never
}

export function createActionsWithSetState<T, I extends Record<string, (old: T, ...args: any[]) => T>>(
  setState: (update: (currVal: T) => T) => void, original: I,
): AsAction<T, I>{
  const result: any = {};
  for (const name in original){
    result[name] = (...args: any[]) => setState((old: T) => original[name](old, ...args));
  }
  return result as AsAction<T, I>;
}