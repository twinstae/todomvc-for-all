import { createContainer } from "../../dependency";
import { JsonValue } from "../../json";
import { useValtioTodoList, valtioActions } from "./hooks/useValtioTodoList";

interface Stoage {
  get(key: string): JsonValue | undefined;
  set(key: string, value: JsonValue | undefined): void;
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
  useTodoList: useValtioTodoList,
  actions: () => valtioActions,
});
