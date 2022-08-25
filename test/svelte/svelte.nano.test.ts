import { actions, todoListStore } from "../../frameworks/nanoTodoListStore";
import { runSvelteImpl } from "./runSvelteImpl";

runSvelteImpl(
  'nanostore',
  todoListStore,
  actions,
  async (init) => {
    todoListStore.set(init);
  },
)