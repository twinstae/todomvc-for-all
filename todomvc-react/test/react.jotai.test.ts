import { todoListAtom, useJotaiActions, useJotaiTodoList } from "@todomvc-react/hooks/useJotaiTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "jotai",
  useJotaiTodoList,
  useJotaiActions,
  undefined,
  async (init) => {
    todoListAtom.onMount = (setAtom) => setAtom(() => init);
  }
);