import { TodoT } from "../../../global";
import { domain } from "../../domain";
import { createActionsWithSetState } from "../../createActionsWithSetState";
import usePersistState from "./usePersistenceState";

const defaultInit: TodoT[] = [];

export function useReactTodoList(){
  const [todoList, setTodoList] = usePersistState<TodoT[]>(defaultInit, 'todo-list');


  return {
    todoList,
    ...createActionsWithSetState(setTodoList, domain)
  }
}
