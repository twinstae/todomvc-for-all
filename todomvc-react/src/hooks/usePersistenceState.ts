import { useEffect, useState } from "react";
import { JsonValue } from "@todomvc-core/json";
import * as shared from "@todomvc-core/sharedContainer";

type Options = {
  log: boolean
}

function usePersistState<T extends JsonValue>(initValue: T, storageKey: string, options: Options = { log: false }) {
  const [state, setState] = useState<T>(initValue);

  const stoage = shared.inject('storage');
  useEffect(() => {
    const saved = stoage.get(storageKey);
    if(saved){
      setState(() => saved as T)
    }
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
