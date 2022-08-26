import type { Accessor } from "solid-js";

import { createContainer } from "../../src/dependency";
import type { TodoT } from "../../todomvc-core/global";
import type { TodoActions } from "../../src/domain";

export const { provide, inject } = createContainer({
  useTodoList: () => ({}) as Accessor<TodoT[]>,
  useActions: () => ({ }) as TodoActions,
});
