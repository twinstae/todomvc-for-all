import { ReadonlyIfObject } from "nanostores/atom";
import { readable } from "svelte/store";
import { createContainer } from "../../dependency";
import type { TodoT } from "../../global";
import { TodoActions } from "../domain";
import { withSubscribe } from "../Storage";

export interface Subscribable<T> {
  subscribe: (subscription: (value: ReadonlyIfObject<T>) => void) => (() => void),
  set?: (value: T) => void
}

export const { provide, inject } = createContainer({
  storage: withSubscribe(new Map()),
  todoList: readable([]) as Subscribable<TodoT[]>,
  actions: {} as TodoActions,
});
