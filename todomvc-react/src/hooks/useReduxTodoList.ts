import {
  addTodo,
  AppDispatch,
  changeTodo,
  completeTodo,
  deleteTodo,
  selectTodoList,
} from "../../../src/reduxTodoListStore";
import { useSelector, useDispatch } from "react-redux";
import type { TodoT } from "../../../src/global";
import { TodoActions } from "../../../src/domain";

export const useAppDispatch: () => AppDispatch = useDispatch;

export function useReduxTodoList(): { todoList: readonly TodoT[] } {
  const todoList = useSelector(selectTodoList);
  return { todoList };
}

export const useReduxActions: () => TodoActions = () => {
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