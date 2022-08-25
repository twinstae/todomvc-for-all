import { shallowRef, getCurrentScope, onScopeDispose } from "vue";

export function useSelectRef<T, S>(
  store: {
    getState: () => T;
    subscribe: (listner: () => void) => () => void;
  },
  select: (state: T) => S
) {
  const state = shallowRef<S>(select(store.getState()));

  let old = select(store.getState());
  const unsubscribe = store.subscribe(() => {
    const next = select(store.getState());
    if (next !== old) {
      state.value = next;
      old = next;
    }
  });

  getCurrentScope() && onScopeDispose(unsubscribe);

  return state;
}
