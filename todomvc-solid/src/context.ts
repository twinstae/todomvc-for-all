import type { Accessor } from "solid-js";

import { createContainer } from "@todomvc-core/dependency";
import type { TodoT } from "@todomvc-core/global";
import type { TodoActions } from "@todomvc-core/domain";

export const { provide, inject } = createContainer({
  useTodoList: () => ({}) as Accessor<TodoT[]>,
  useActions: () => ({ }) as TodoActions,
});
