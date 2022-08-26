import type { Accessor } from "solid-js";

import { createContainer } from "@core/dependency";
import type { TodoT } from "@core/global";
import type { TodoActions } from "@core/domain";

export const { provide, inject } = createContainer({
  useTodoList: () => ({}) as Accessor<TodoT[]>,
  useActions: () => ({ }) as TodoActions,
});
