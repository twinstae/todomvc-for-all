import { todoListStore } from "../../frameworks/nanoTodoListStore";
import {
  nanoActions,
  useNanoTodoList,
} from "../../frameworks/react/hooks/useNanoTodolist";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "nanostore",
  useNanoTodoList,
  () => nanoActions,
  ({ children }) => children,
  async (init) => {
    todoListStore.set(init);
  }
);