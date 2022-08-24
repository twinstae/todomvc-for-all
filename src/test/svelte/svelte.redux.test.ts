
import { loadSaved, reduxActions, reduxStore } from "../../frameworks/reduxTodoListStore";
import { runSvelteImpl } from "./runSvelteImpl";

export function reduxToSvelte<T, S>(store: {
  getState: () => T,
  subscribe: (listner: () => void) => () => void
}, select: (state: T) => S) {
  return {
    subscribe: (subscription: (value: S) => void) => {
      subscription(select(store.getState()));
      return store.subscribe(() => {
        subscription(select(store.getState()))
      })
    }
  }
}


runSvelteImpl(
  'redux',
  reduxToSvelte(reduxStore, (state) => state.todoList),
  reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  },
)