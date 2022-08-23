import React from "react";
import { render } from "@testing-library/react";
import TodoMvcReact from "../frameworks/react/TodoMvcReact";

import runTest from "./runTest";
import { provide, withSubscribe } from "../frameworks/react/context";
import {
  useValtioTodoList,
  valtioActions,
} from "../frameworks/react/useValtioTodoList";
import {
  nanoActions,
  useNanoTodoList,
} from "../frameworks/react/useNanoTodolist";

function runReactImpl(
  name: string,
  useTodoListImpl: typeof useNanoTodoList,
  actionsImpl: typeof nanoActions
) {
  runTest({
    framework: `react: ${name}`,
    render: (init) => {
      provide("storage", withSubscribe(new Map([["todo-list", init]])));

      provide("useTodoList", useTodoListImpl);
      provide("actions", actionsImpl);

      render(<TodoMvcReact />);
    },
  });
}

runReactImpl("valtio", useValtioTodoList, valtioActions);
runReactImpl("valtio", useNanoTodoList, nanoActions);
