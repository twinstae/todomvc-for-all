import { createContainer } from "../../dependency";
import { TodoT } from "../../global";
import { JsonValue } from "../../json";
import { TodoActions } from "../domain";

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

export const { provide, inject } = createContainer({
  storage: withSubscribe(new Map()),
  useTodoList: () => ({ todoList: [] as readonly TodoT[] }),
  actions: () => ({ }) as TodoActions,
});
