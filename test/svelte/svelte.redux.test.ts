import {
  loadSaved,
  reduxActions,
  reduxStore,
} from "../../frameworks/reduxTodoListStore";
import { reduxToSvelte } from "../../frameworks/svelte/reduxToSvelte";
import { runSvelteImpl } from "./runSvelteImpl";

runSvelteImpl(
  "redux",
  reduxToSvelte(reduxStore, (state) => state.todoList),
  reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  }
);
