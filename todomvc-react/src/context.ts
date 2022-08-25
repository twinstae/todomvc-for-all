import { createContainer } from "../../src/dependency";
import { withSubscribe } from "../../src/Storage";
import type { TodoT } from "../../src/global";
import type { TodoActions } from "../../src/domain";

export const { provide, inject } = createContainer({
  storage: withSubscribe(new Map()),
  useTodoList: () => ({ todoList: [] as readonly TodoT[] }),
  useActions: () => ({ }) as TodoActions,
});
