/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, action, WritableAtom } from "nanostores";
import { TodoT } from "../global";
import { domain } from "./domain";
import { inject } from "./react/context";
import { AsAction } from "./utility";

export const todoListStore = atom<TodoT[]>([]);

function createActions<
  T,
  I extends Record<string, (old: T, ...args: any[]) => T>
>(store: WritableAtom<T>, rawActions: I): AsAction<T, I> {
  const result: any = {};
  for (const name in rawActions){
    result[name] = action(store, name, (store, ...args) => {
      const old = store.get();
      store.set(rawActions[name](old, ...args));
    });
  }
  return result as AsAction<T, I>;
}

export const actions = createActions(todoListStore, domain);

todoListStore.subscribe((todoList) => {
  inject("storage").set("todo-list", [...todoList]);
})