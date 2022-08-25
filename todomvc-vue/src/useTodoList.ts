import { Ref } from "vue";
import { TodoT } from "../../src/global";
import createDependency from "./createDependency";

type UseTodoListT = Ref<readonly TodoT[]>;

export const [
  useTodoListKey,
  useTodoList,
  provideUseTodoList
] = createDependency<UseTodoListT>('useTodoList')