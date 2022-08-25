import { loadSaved, reduxActions, reduxStore } from "../../src/reduxTodoListStore";
import { useReduxStore } from "../src/useReduxStore";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'store',
  () => () => useReduxStore(reduxStore, ({todoList}) => todoList),
  () => reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  },
)