import { useState } from "react";
import { inject } from "../../dependency";

type Options = {
  log: boolean
}

function usePersistState<T>(initValue: T, storageKey: string, options: Options = { log: false }) {
  const stoage = inject('storage');
  const [state, setState] = useState<T>(stoage.get(storageKey) || initValue);

  return [state, (update: (old: T) => T) => {
    setState(old => {
      const result = update(old);
      stoage.set(storageKey, result);
      if (options.log){ console.log(result) }
      return result;
    });
  }] as const;
}

export default usePersistState;
