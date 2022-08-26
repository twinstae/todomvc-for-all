import { TodoListWrapper, useTodoActions, useTodoList } from "@todomvc-solid/todoListContext";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'store',
  useTodoList,
  useTodoActions,
  undefined,
  TodoListWrapper
)