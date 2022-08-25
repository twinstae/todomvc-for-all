import {
  useZustandTodoList,
  useZustandActions,
  useZustandStore,
} from "../src/hooks/useZustandTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "zustand",
  useZustandTodoList,
  useZustandActions,
  undefined,
  async (init) => {
    useZustandStore.setState({ todoList: init })
  }
);