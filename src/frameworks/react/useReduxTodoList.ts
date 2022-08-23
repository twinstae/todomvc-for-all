import {
  addTodo,
  AppDispatch,
  changeTodo,
  completeTodo,
  deleteTodo,
  loadSaved,
  selectTodoList,
} from "../reduxTodoListStore";
import { useSelector, useDispatch } from "react-redux";
import { TodoT } from "../../global";
import { inject } from "./context";
import { useLayoutEffect } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;

export function useReduxTodoList(): { todoList: readonly TodoT[] } {
  const todoList = useSelector(selectTodoList);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const saved = inject("storage").get("todo-list");
    if (saved) {
      dispatch(loadSaved({ saved }));
    }
  }, []);
  return { todoList };
}

export const useReduxActions: () => {
  addTodo(content: string): void;
  completeTodo(id: number, isCompleted: boolean): void;
  changeTodo(id: number, newContent: string): void;
  deleteTodo(id: number): void;
} = () => {
  const dispatch = useAppDispatch();

  return {
    addTodo(content) {
      dispatch(addTodo({ content }));
    },
    completeTodo(id, isCompleted) {
      dispatch(completeTodo({ id, isCompleted }));
    },
    changeTodo(id, content) {
      dispatch(changeTodo({ id, content }));
    },
    deleteTodo(id) {
      dispatch(deleteTodo({ id }));
    },
  };
};
