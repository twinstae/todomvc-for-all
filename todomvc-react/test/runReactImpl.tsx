import React, { ReactElement } from "react";
import { render } from "@testing-library/react";

import runTest from "../../test/runTest";
import TodoMvcReact from "../src/TodoMvcReact";
import { inject, provide } from "../src/context";
import type { TodoT } from "../../src/global";
import type { TodoActions } from "../../src/domain";

const e = React.createElement;

export function runReactImpl(
  name: string,
  useTodoListImpl: () => ({ todoList: readonly TodoT[] }),
  useActionsImpl: () => TodoActions,
  Wrapper: (props: { children: React.ReactNode }) => ReactElement = ({ children }) =>
    e('div', undefined, children),
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
        e(Wrapper, undefined, <TodoMvcReact />)
      );
    },
  });
}
