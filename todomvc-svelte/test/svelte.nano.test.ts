import { actions, todoListStore } from "../../src/nanoTodoListStore";
import { runSvelteImpl } from "./runSvelteImpl";

runSvelteImpl(
  'nanostore',
  todoListStore,
  actions,
  async (init) => {
    todoListStore.set(init);
  },
)