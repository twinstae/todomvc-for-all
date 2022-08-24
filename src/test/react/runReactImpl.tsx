import React from "react";
import { render } from "@testing-library/react";

import runTest from "../runTest";
import TodoMvcReact from "../../frameworks/react/TodoMvcReact";
import { inject, provide } from "../../frameworks/react/context";
import {
  nanoActions,
  useNanoTodoList,
} from "../../frameworks/react/hooks/useNanoTodolist";
import { TodoT } from "../../global";

export function runReactImpl(
  name: string,
  useTodoListImpl: typeof useNanoTodoList,
  useActionsImpl: () => typeof nanoActions,
  Wrapper: (props: { children: JSX.Element }) => JSX.Element = ({ children }) =>
    children,
  setup: (init: TodoT[]) => void = () => undefined,
) {
  runTest({
    framework: `react: ${name}`,
    render: (init) => {
      inject("storage").set("todo-list", init);
      setup(init);

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
