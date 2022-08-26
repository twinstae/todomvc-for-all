import { actions, todoListStore } from "../../todomvc-core/nanoTodoListStore";
import { runSvelteImpl } from "./runSvelteImpl";

runSvelteImpl(
  'nanostore',
  todoListStore,
  actions,
  async (init) => {
    todoListStore.set(init);
  },
)