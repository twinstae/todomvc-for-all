import * as shared from "../../../src/sharedContainer";
import { atom, useAtomValue, useSetAtom } from "jotai";
import type { TodoT } from "../../../src/global";
import { domain } from "../../../src/domain";
import { JsonValue } from "../../../src/json";
import { createActionsWithSetState } from "../../../src/createActionsWithSetState";

const atomWithStorage = <T extends JsonValue>(key: string, initialValue: T) => {
  const baseAtom = atom(
    (shared.inject("storage").get(key) as T | undefined) || initialValue
  );

  const derivedAtom = atom<T, (old: T) => T>(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      shared.inject("storage").set(key, nextValue);
    }
  );
  return derivedAtom;
};

export const todoListAtom = atomWithStorage("todo-list", [] as TodoT[]);

export function useJotaiTodoList(): { todoList: readonly TodoT[] } {
  const todoList = useAtomValue(todoListAtom);
  return { todoList };
}

export const useJotaiActions = () => {
  const setTodoList = useSetAtom(todoListAtom);
  
  return createActionsWithSetState(setTodoList, domain);
};
