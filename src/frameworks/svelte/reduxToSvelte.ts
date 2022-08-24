export function reduxToSvelte<T, S>(
  store: {
    getState: () => T;
    subscribe: (listner: () => void) => () => void;
  },
  select: (state: T) => S
) {
  return {
    subscribe: (subscription: (value: S) => void) => {
      let old = select(store.getState());
      subscription(old);
      return store.subscribe(() => {
        const next = select(store.getState());
        if (next !== old) {
          subscription(next);
          old = next;
        }
      });
    },
  };
}
