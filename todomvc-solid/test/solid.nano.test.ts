import { useStore } from "@nanostores/solid";
import { actions, todoListStore } from "../../todomvc-core/nanoTodoListStore";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'nanostore',
  () => useStore(todoListStore),
  () => actions,
  async (init) => {
    todoListStore.set(init);
  }
)