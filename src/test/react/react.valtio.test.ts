import {
  store,
  useValtioTodoList,
  valtioActions,
} from "../../frameworks/react/hooks/useValtioTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "valtio",
  useValtioTodoList,
  () => valtioActions,
  ({ children }) => children,
  (init) => {
    store.todoList = init;
  }
);
