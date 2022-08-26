import { TodoListWrapper, useTodoActions, useTodoList } from "@/todoListContext";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'store',
  useTodoList,
  useTodoActions,
  undefined,
  TodoListWrapper
)