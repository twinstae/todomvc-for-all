import { todoList, todoListActions } from "../../frameworks/svelte/todoList";
import { runSvelteImpl } from "./runSvelteImpl";

runSvelteImpl(
  'nanostore',
  todoList,
  todoListActions,
  async (init) => {
    todoList.set(init);
  },
)