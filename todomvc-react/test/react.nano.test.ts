import { todoListStore } from "@core/nanoTodoListStore";
import {
  nanoActions,
  useNanoTodoList,
} from "@/hooks/useNanoTodolist";
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