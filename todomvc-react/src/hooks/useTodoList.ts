import type { TodoT } from "../../../src/global";
import { domain } from "../../../src/domain";
import { createActionsWithSetState } from "../../../src/createActionsWithSetState";
import usePersistState from "./usePersistenceState";

const defaultInit: TodoT[] = [];

export function useReactTodoList(){
  const [todoList, setTodoList] = usePersistState<TodoT[]>(defaultInit, 'todo-list');

  return {
    todoList,
    ...createActionsWithSetState(setTodoList, domain)
  }
}
