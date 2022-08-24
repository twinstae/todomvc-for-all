import { TodoListWrapper, useTodoActions, useTodoList } from "../../frameworks/solid/todoListContext";
import { runSolidImpl } from "./runSolidImpl";

runSolidImpl(
  'store',
  useTodoList,
  useTodoActions,
  undefined,
  TodoListWrapper
)