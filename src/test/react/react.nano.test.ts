import {
  nanoActions,
  useNanoTodoList,
} from "../../frameworks/react/hooks/useNanoTodolist";
import { runReactImpl } from "./runReactImpl";

runReactImpl(
  "nanostore",
  useNanoTodoList,
  () => nanoActions
);