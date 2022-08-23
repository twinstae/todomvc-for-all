import {
  useZustandTodoList,
  useZustandActions,
} from "../frameworks/react/hooks/useZustandTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl("zustand", useZustandTodoList, useZustandActions);