import { createContainer } from "../../dependency";
import { withSubscribe } from "../Storage";
import type { TodoT } from "../../global";
import type { TodoActions } from "../domain";

export const { provide, inject } = createContainer({
  storage: withSubscribe(new Map()),
  useTodoList: () => ({ todoList: [] as readonly TodoT[] }),
  useActions: () => ({ }) as TodoActions,
});
