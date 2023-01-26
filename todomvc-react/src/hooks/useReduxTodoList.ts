import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  AppDispatch,
  changeTodo,
  completeTodo,
  deleteTodo,
  selectTodoList,
	loadSaved, reduxStore
} from "@todomvc-core/reduxTodoListStore";
import type { TodoT } from "@todomvc-core/global";
import { TodoActions } from "@todomvc-core/domain";

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

export const reduxInit = async (init: TodoT[]) => {
	reduxStore.dispatch(loadSaved({ saved: init }));
};