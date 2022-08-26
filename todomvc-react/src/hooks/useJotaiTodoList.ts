import { atom, useAtomValue, useSetAtom } from "jotai";
import * as shared from "@todomvc-core/sharedContainer";
import type { TodoT } from "@todomvc-core/global";
import { domain } from "@todomvc-core/domain";
import { JsonValue } from "@todomvc-core/json";
import { createActionsWithSetState } from "@todomvc-core/createActionsWithSetState";

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
