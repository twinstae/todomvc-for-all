import { TodoListWrapper, useTodoActions, useTodoList } from "../src/todoListContext";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'store',
  useTodoList,
  useTodoActions,
  undefined,
  TodoListWrapper
)