import { loadSaved, reduxActions, reduxStore } from "../../frameworks/reduxTodoListStore";
import { useReduxStore } from "../../frameworks/solid/useReduxStore";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'store',
  () => () => useReduxStore(reduxStore, ({todoList}) => todoList),
  () => reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  },
)