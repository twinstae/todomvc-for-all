import {
  useZustandTodoList,
  useZustandActions,
  useZustandStore,
} from "../../frameworks/react/hooks/useZustandTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "zustand",
  useZustandTodoList,
  useZustandActions,
  ({ children }) => children,
  async (init) => {
    useZustandStore.setState({ todoList: init })
  }
);