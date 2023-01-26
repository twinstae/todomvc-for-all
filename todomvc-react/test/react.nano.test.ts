import { todoListStore } from "@todomvc-core/nanoTodoListStore";
import {
  useNanoActions,
  useNanoTodoList,
} from "../src/hooks/useNanoTodolist";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "nanostore",
  useNanoTodoList,
  useNanoActions,
  undefined,
  async (init) => {
    todoListStore.set(init);
  }
);