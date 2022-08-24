import { JsonValue } from "../json";

interface Stoage {
  get(key: string): JsonValue | undefined;
  set(key: string, value: JsonValue | undefined): void;
  delete(key: string): void;
}

type CallbackT = (key: string, value: JsonValue | undefined) => void;

interface StorageWithSubscribe extends Stoage {
  subscribe(callback: CallbackT): () => void;
}

export function withSubscribe(storage: Stoage): StorageWithSubscribe{
  let _subscribers: CallbackT[] = [];

  return {
    get: (key) => storage.get(key),
    set(key, value) {
      storage.set(key, value);
      _subscribers.forEach((cb) => cb(key, value));
    },
    delete(key) {
      storage.delete(key);
      _subscribers.forEach((cb) => cb(key, undefined));
    }, 
    subscribe(callback) {
      _subscribers.push(callback);
      return () => {
        _subscribers = _subscribers.filter((cb) => cb !== callback);
      };
    },
  }
}


export const localStorageWithSubscribe = withSubscribe({
  get(key: string) {
    const saved = localStorage.getItem(key);
    if (!saved) return undefined;

    return JSON.parse(saved);
  },
  set(key: string, value: JsonValue) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  delete(key: string){
    localStorage.removeItem(key);
  }
});