import { loadSaved, reduxActions, reduxStore } from "@core/reduxTodoListStore";
import { useReduxStore } from "@/useReduxStore";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'store',
  () => () => useReduxStore(reduxStore, ({todoList}) => todoList),
  () => reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  },
)