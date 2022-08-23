import { useJotaiActions, useJotaiTodoList } from "../frameworks/react/hooks/useJotaiTodoList";
import { runReactImpl } from "./runReactImpl";

runReactImpl("jotai", useJotaiTodoList, useJotaiActions);