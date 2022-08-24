import { todoListAtom, useJotaiActions, useJotaiTodoList } from "../../frameworks/react/hooks/useJotaiTodoList";
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