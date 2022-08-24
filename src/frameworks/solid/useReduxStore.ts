import { onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";

export function useReduxStore<
  T,
  S extends Array<unknown> | Record<string, unknown>
>(
  store: {
    getState: () => T,
    subscribe: (listner: () => void) => () => void,
  },
  select: (state: T) => S
) {
  const [state, setState] = createStore<S>(select(store.getState()));
  const unsubscribe = store.subscribe(() => setState(reconcile(select(store.getState()))));
  onCleanup(() => unsubscribe());
  return state;
}