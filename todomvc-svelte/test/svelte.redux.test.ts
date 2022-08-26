import {
  loadSaved,
  reduxActions,
  reduxStore,
} from "@todomvc-core/reduxTodoListStore";
import { reduxToSvelte } from "../src/reduxToSvelte";
import { runSvelteImpl } from "./runSvelteImpl";

runSvelteImpl(
  "redux",
  reduxToSvelte(reduxStore, (state) => state.todoList),
  reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  }
);
