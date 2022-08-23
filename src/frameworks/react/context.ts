import { createContainer } from "../../dependency";
import { nanoActions, useNanoTodoList } from "./useNanoTodolist";

interface Stoage {
  get(key: string): any;
  set(key: string, value: any): void;
}

export function withSubscribe(storage: Stoage){
  let _subscribers: ((key: string, value: any) => void)[] = [];

  return {
    get: (key: string) => storage.get(key),
    set(key: string, value: any) {
      storage.set(key, value);
      _subscribers.forEach((cb) => cb(key, value));
    },
    subscribe(callback: (key: string, value: any) => void) {
      _subscribers.push(callback);
      return () => {
        _subscribers = _subscribers.filter((cb) => cb !== callback);
      };
    },
  }
}

export const { provide, inject } = createContainer({
  storage: withSubscribe({
    get(key: string) {
      const saved = localStorage.getItem(key);
      if (!saved) return undefined;

      return JSON.parse(saved);
    },
    set(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  }),
  useTodoList: useNanoTodoList,
  actions: nanoActions,
});
