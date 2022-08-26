import {
  store,
  useValtioTodoList,
  valtioActions,
} from "@todomvc-react/hooks/useValtioTodoList";
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
