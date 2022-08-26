import type { Ref } from "vue";
import type { TodoT } from "@core/global";
import createDependency from "@/createDependency";

type UseTodoListT = Ref<readonly TodoT[]>;

export const [
  useTodoListKey,
  useTodoList,
  provideUseTodoList
] = createDependency<UseTodoListT>('useTodoList')