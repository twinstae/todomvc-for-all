import { useState } from "react";
import { inject } from "../../dependency";

function usePersistState<T>(initValue: T, storageKey: string) {
  const stoage = inject('storage');
  const [state, setState] = useState<T>(stoage.get(storageKey) || initValue);

  return [state, (update: (old: T) => T) => {
    setState(old => {
      stoage.set(storageKey, update(state));
      return update(old);
    });
  }] as const;
}

export default usePersistState;
