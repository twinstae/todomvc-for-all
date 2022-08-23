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
import {
  useReduxActions,
  useReduxTodoList,
} from "../frameworks/react/useReduxTodoList";
import { Provider } from "react-redux";
import { store } from "../frameworks/reduxTodoListStore";

function runReactImpl(
  name: string,
  useTodoListImpl: typeof useNanoTodoList,
  useActionsImpl: () => typeof nanoActions,
  Wrapper: (props: { children: JSX.Element }) => JSX.Element = ({ children }) =>
    children
) {
  runTest({
    framework: `react: ${name}`,
    render: (init) => {
      provide("storage", withSubscribe(new Map([["todo-list", init]])));

      provide("useTodoList", useTodoListImpl);
      provide("actions", useActionsImpl);

      render(
        <Wrapper>
          <TodoMvcReact />
        </Wrapper>
      );
    },
  });
}

runReactImpl("valtio", useValtioTodoList, () => valtioActions);
runReactImpl("nanostore", useNanoTodoList, () => nanoActions);
runReactImpl("redux", useReduxTodoList, useReduxActions, ({ children }) => (
  <Provider store={store}>{children}</Provider>
));
