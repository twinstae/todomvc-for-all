import React from "react";
import { render } from "@testing-library/react";

import runTest from "../../test/runTest";
import * as shared from "../../src/sharedContainer";
import type { TodoT } from "../../src/global";
import type { TodoActions } from "../../src/domain";
import App from "../src/App";
import { UseTodoListContext } from "../src/useTodoList";
import { UseActionsContext } from "../src/useActions";

export function runReactImpl(
  name: string,
  useTodoListImpl: () => { todoList: readonly TodoT[] },
  useActionsImpl: () => TodoActions,
  Wrapper: (props: { children: React.ReactNode }) => JSX.Element = ({
    children,
  }) => <div>{children}</div>,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined
) {
  runTest({
    framework: `react: ${name}`,
    render: async (init) => {
      shared.inject("storage").set("todo-list", init);
      await setup(init);

      render(
        <UseTodoListContext.Provider value={useTodoListImpl}>
          <UseActionsContext.Provider value={useActionsImpl}>
            <Wrapper>
              <App />
            </Wrapper>
          </UseActionsContext.Provider>
        </UseTodoListContext.Provider>
      );
    },
  });
}
