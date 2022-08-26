import {
  useZustandTodoList,
  useZustandActions,
  useZustandStore,
} from "@todomvc-react/hooks/useZustandTodoList";
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