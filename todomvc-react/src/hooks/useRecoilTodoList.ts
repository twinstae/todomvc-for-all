import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import * as shared from "@todomvc-core/sharedContainer";
import { domain } from "@todomvc-core/domain";
import { createActionsWithSetState } from "@todomvc-core/createActionsWithSetState";
import type { AtomEffect } from "recoil";
import type { TodoT } from "@todomvc-core/global";

const storageEffect = (key: string): AtomEffect<TodoT[]> => ({ setSelf, onSet }) => {
  const storage = shared.inject('storage');
  const savedValue = storage.get(key)
  if (savedValue) {
    setSelf(savedValue as TodoT[]);
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? storage.set(key, undefined)
      : storage.set(key, newValue);
  });
};

const todoListState = atom({
  key: 'todoList',
  default: [] as TodoT[],
  effects: [
    storageEffect("todo-list"),
  ]
});

export function useRecoilTodoList(): { todoList: readonly TodoT[] } {
  const todoList = useRecoilValue(todoListState);
  return { todoList };
}

export const useRecoilActions = () => {
  const setTodoList = useSetRecoilState(todoListState);

  return createActionsWithSetState(setTodoList, domain);
};
