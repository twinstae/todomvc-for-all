import { createContainer } from "../../src/dependency";
import type { TodoT } from "../../src/global";
import type { TodoActions } from "../../src/domain";

export const { provide, inject } = createContainer({
  useTodoList: () => ({ todoList: [] as readonly TodoT[] }),
  useActions: () => ({ }) as TodoActions,
});
