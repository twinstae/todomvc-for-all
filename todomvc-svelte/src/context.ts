import type { ReadonlyIfObject } from "nanostores/atom";
import type { TodoT } from "../../todomvc-core/global";
import type { TodoActions } from "../../src/domain";
import { createDependency } from "./createDependency";

export interface Subscribable<T> {
  subscribe: (subscription: (value: ReadonlyIfObject<T>) => void) => () => void;
  set?: (value: T) => void;
}

export const [getTodoListStore, setTodoListStore] =
  createDependency<Subscribable<TodoT[]>>("todoListStore");

export const [getActions, setActions] =
  createDependency<TodoActions>("actions");
