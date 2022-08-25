import { loadSaved, reduxActions, reduxStore } from "../../frameworks/reduxTodoListStore";
import { useSelectRef } from "../../frameworks/vue/useSelectRef";
import { runVueImpl } from "./runVueImpl";

runVueImpl(
  'redux',
  () => useSelectRef(reduxStore, ({todoList}) => todoList),
  () => reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  },
)