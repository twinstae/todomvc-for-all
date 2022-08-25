import { todoList, todoListActions } from "../src/todoList";
import { runSvelteImpl } from "./runSvelteImpl";

runSvelteImpl(
  'store',
  todoList,
  todoListActions,
  async (init) => {
    todoList.set(init);
  },
)