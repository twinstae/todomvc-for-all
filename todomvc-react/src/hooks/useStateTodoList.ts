import type { TodoT } from "@core/global";
import { domain } from "@core/domain";
import { createActionsWithSetState } from "@core/createActionsWithSetState";
import usePersistState from "./usePersistenceState";

const defaultInit: TodoT[] = [];

export function useReactTodoList(){
  const [todoList, setTodoList] = usePersistState<TodoT[]>(defaultInit, 'todo-list');

  return {
    todoList,
    ...createActionsWithSetState(setTodoList, domain)
  }
}
