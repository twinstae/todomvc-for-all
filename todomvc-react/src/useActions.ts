import { createContext, useContext } from "react";
import type { TodoActions } from "@core/domain";

export const UseActionsContext = createContext( () => ({ }) as TodoActions);

export const useActions = () => useContext(UseActionsContext)();