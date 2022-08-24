import { getCurrentScope, onScopeDispose, shallowRef } from "vue";
import { loadSaved, reduxActions, reduxStore } from "../../frameworks/reduxTodoListStore";
import { runVueImpl } from "./runVueImpl";

export function useSelectRef<T, S>(store: {
  getState: () => T,
  subscribe: (listner: () => void) => () => void
}, select: (state: T) => S) {
  const state = shallowRef<S>(select(store.getState()))

  const unsubscribe = store.subscribe(() => {
    state.value = select(store.getState())
  })

  getCurrentScope() && onScopeDispose(unsubscribe)

  return state
}

runVueImpl(
  'redux',
  () => useSelectRef(reduxStore, ({todoList}) => todoList),
  () => reduxActions,
  async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
  },
)