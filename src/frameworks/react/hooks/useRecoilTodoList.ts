import { atom, useRecoilState, useSetRecoilState, AtomEffect } from "recoil";
import { inject } from "../context";
import { TodoT } from "../../../global";
import { domain } from "../../domain";
import { useLayoutEffect } from "react";

const storageEffect = (key: string): AtomEffect<TodoT[]> => ({ setSelf, onSet }) => {
  const storage = inject('storage');
  const savedValue = storage.get(key)
  if (savedValue) {
    setSelf(savedValue);
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
  const [todoList, setTodoList] = useRecoilState(todoListState);
  useLayoutEffect(() => {
    const saved = inject("storage").get("todo-list");
    if (saved) {
      setTodoList(saved);
    }
  }, []);
  return { todoList };
}

export const useRecoilActions = () => {
  const setTodoList = useSetRecoilState(todoListState);
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
