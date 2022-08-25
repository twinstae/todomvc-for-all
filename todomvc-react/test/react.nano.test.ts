import { todoListStore } from "../../src/nanoTodoListStore";
import {
  nanoActions,
  useNanoTodoList,
} from "../src/hooks/useNanoTodolist";
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