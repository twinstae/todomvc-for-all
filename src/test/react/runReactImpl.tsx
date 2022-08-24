import React from "react";
import { render } from "@testing-library/react";

import runTest from "../runTest";
import TodoMvcReact from "../../frameworks/react/TodoMvcReact";
import { inject, provide } from "../../frameworks/react/context";
import type { TodoT } from "../../global";
import type { TodoActions } from "../../frameworks/domain";

export function runReactImpl(
  name: string,
  useTodoListImpl: () => ({ todoList: readonly TodoT[] }),
  useActionsImpl: () => TodoActions,
  Wrapper: (props: { children: JSX.Element }) => JSX.Element = ({ children }) =>
    children,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
) {
  runTest({
    framework: `react: ${name}`,
    render: async (init) => {
      inject("storage").set("todo-list", init);
      provide("useTodoList", useTodoListImpl);
      provide("useActions", useActionsImpl);
      await setup(init);

      render(
        <Wrapper>
          <TodoMvcReact />
        </Wrapper>
      );
    },
  });
}
