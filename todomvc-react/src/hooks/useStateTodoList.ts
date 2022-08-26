import type { TodoT } from "@todomvc-core/global";
import { domain } from "@todomvc-core/domain";
import { createActionsWithSetState } from "@todomvc-core/createActionsWithSetState";
import usePersistState from "./usePersistenceState";

const defaultInit: TodoT[] = [];

export function useReactTodoList(){
  const [todoList, setTodoList] = usePersistState<TodoT[]>(defaultInit, 'todo-list');

  return {
    todoList,
    ...createActionsWithSetState(setTodoList, domain)
  }
}
