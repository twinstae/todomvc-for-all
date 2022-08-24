import { shallowRef, getCurrentScope, onScopeDispose } from "vue"

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