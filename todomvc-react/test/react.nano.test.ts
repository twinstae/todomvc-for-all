import { todoListStore } from "@todomvc-core/nanoTodoListStore";
import {
  nanoActions,
  useNanoTodoList,
} from "@todomvc-react/hooks/useNanoTodolist";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "nanostore",
  useNanoTodoList,
  () => nanoActions,
  undefined,
  async (init) => {
    todoListStore.set(init);
  }
);