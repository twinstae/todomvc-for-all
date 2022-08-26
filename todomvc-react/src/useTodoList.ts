import { createContext, useContext } from "react";
import type { TodoT } from "@todomvc-core/global";

export const UseTodoListContext = createContext(() => ({ todoList: [] as readonly TodoT[] }));

export const useTodoList = () => useContext(UseTodoListContext)();