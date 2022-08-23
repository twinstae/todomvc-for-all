import { useLayoutEffect, useState } from "react";
import { inject } from "../context";

type Options = {
  log: boolean
}

function usePersistState<T>(initValue: T, storageKey: string, options: Options = { log: false }) {
  const [state, setState] = useState<T>(initValue);

  const stoage = inject('storage');
  useLayoutEffect(() => {
    setState(stoage.get(storageKey))
  }, []);

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
