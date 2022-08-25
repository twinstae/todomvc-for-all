import { createContext, useContext } from "react";
import type { TodoActions } from "../../src/domain";

export const UseActionsContext = createContext( () => ({ }) as TodoActions);

export const useActions = () => useContext(UseActionsContext)();