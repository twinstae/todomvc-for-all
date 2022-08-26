import type { Ref } from "vue";
import type { TodoT } from "@todomvc-core/global";
import createDependency from "./createDependency";

type UseTodoListT = Ref<readonly TodoT[]>;

export const [
  useTodoListKey,
  useTodoList,
  provideUseTodoList
] = createDependency<UseTodoListT>('useTodoList')