import { useStore } from "@nanostores/vue";
import { actions, todoListStore } from "@todomvc-core/nanoTodoListStore";
import { runVueImpl } from "./runVueImpl";

runVueImpl(
  'nanostore',
  () => useStore(todoListStore),
  () => actions,
  async (init) => {
    todoListStore.set(init);
  },
)