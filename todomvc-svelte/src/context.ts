import type { ReadonlyIfObject } from "nanostores/atom";
import { readable } from "svelte/store";
import { createContainer } from "../../src/dependency";
import type { TodoT } from "../../src/global";
import type { TodoActions } from "../../src/domain";
import { withSubscribe } from "../../src/Storage";

export interface Subscribable<T> {
  subscribe: (subscription: (value: ReadonlyIfObject<T>) => void) => (() => void),
  set?: (value: T) => void
}

export const { provide, inject } = createContainer({
  storage: withSubscribe(new Map()),
  todoList: readable([]) as Subscribable<TodoT[]>,
  actions: {} as TodoActions,
});
