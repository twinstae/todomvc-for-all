/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, action, WritableAtom } from "nanostores";
import { TodoT } from "../global";
import { domain, TodoActions } from "./domain";

export const todoListStore = atom<TodoT[]>([]);

function createActions<
  T,
  R extends Record<string, (old: T, ...args: any) => T>
>(store: WritableAtom<T>, rawActions: R) {
  return Object.fromEntries(
    Object.entries(rawActions).map(([name, rawAction]) => {
      return [
        name,
        action(store, name, (store, ...args) => {
          const old = store.get();
          store.set(rawAction(old, ...args));
        }),
      ];
    })
  );
}

export const actions = createActions(todoListStore, domain) as TodoActions;
