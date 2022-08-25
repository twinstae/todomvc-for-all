import { loadSaved, reduxActions, reduxStore } from "../../src/reduxTodoListStore";
import { useSelectRef } from "../src/useSelectRef";
import { runVueImpl } from "./runVueImpl";

runVueImpl(
  'redux',
  () => useSelectRef(reduxStore, ({todoList}) => todoList),
  () => reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  },
)