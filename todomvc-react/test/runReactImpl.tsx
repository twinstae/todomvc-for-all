import React from "react";
import { render } from "@testing-library/react";

import runTest from "../../test/runTest";
import * as shared from "@todomvc-core/sharedContainer";
import type { TodoT } from "@todomvc-core/global";
import type { TodoActions } from "@todomvc-core/domain";
import App from "../src/App";
import Provider from "../src/Provider";

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
        <Provider useTodoList={useTodoListImpl} useActions={useActionsImpl}>
          <Wrapper>
            <App />
          </Wrapper>
        </Provider>
      );
    },
  });
}
