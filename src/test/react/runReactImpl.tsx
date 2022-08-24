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
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
) {
  runTest({
    framework: `react: ${name}`,
    render: async (init) => {
      inject("storage").set("todo-list", init);
      provide("useTodoList", useTodoListImpl);
      provide("actions", useActionsImpl);
      await setup(init);

      render(
        <Wrapper>
          <TodoMvcReact />
        </Wrapper>
      );
    },
  });
}
