import { inject } from "../context";
import { atom, useAtom, useSetAtom } from "jotai";
import { TodoT } from "../../../global";
import { domain } from "../../domain";
import { useLayoutEffect } from "react";

const atomWithStorage = <T>(key: string, initialValue: T) => {
  const baseAtom = atom(
    (inject("storage").get(key) as T | undefined) || initialValue
  );

  const derivedAtom = atom<T, (old: T) => T>(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      inject("storage").set(key, nextValue);
    }
  );
  return derivedAtom;
};

export const todoListAtom = atomWithStorage("todo-list", [] as TodoT[]);

export function useJotaiTodoList(): { todoList: readonly TodoT[] } {
  const [todoList, setTodoList] = useAtom(todoListAtom);
  useLayoutEffect(() => {
    const saved = inject("storage").get("todo-list");
    if (saved) {
      setTodoList(saved);
    }
  }, []);
  return { todoList };
}

export const useJotaiActions = () => {
  const setTodoList = useSetAtom(todoListAtom);
  const addTodo = (content: string) =>
    setTodoList((old) => domain.addTodo(old, content));

  const completeTodo = (targetId: TodoT["id"], isCompleted: boolean) => {
    setTodoList((old) => domain.completeTodo(old, targetId, isCompleted));
  };

  const deleteTodo = (targetId: TodoT["id"]) => {
    setTodoList((old) => domain.deleteTodo(old, targetId));
  };

  const changeTodo = (targetId: TodoT["id"], newContent: string) => {
    setTodoList((old) => domain.changeTodo(old, targetId, newContent));
  };

  return {
    addTodo,
    changeTodo,
    completeTodo,
    deleteTodo,
  };
};
