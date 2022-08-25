import {
  store,
  useValtioTodoList,
  valtioActions,
} from "../src/hooks/useValtioTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "valtio",
  useValtioTodoList,
  () => valtioActions,
  undefined,
  async (init) => {
    store.todoList = init;
  }
);
