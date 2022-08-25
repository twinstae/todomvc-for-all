import { createContext, useContext } from "react";
import type { TodoT } from "../../src/global";

export const UseTodoListContext = createContext(() => ({ todoList: [] as readonly TodoT[] }));

export const useTodoList = () => useContext(UseTodoListContext)();