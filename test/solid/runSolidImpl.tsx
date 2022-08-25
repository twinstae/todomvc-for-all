/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { render } from "solid-testing-library";
import type { Accessor } from "solid-js";
import type { JSX } from "solid-js/types/jsx";

import runTest from "../runTest";
import TodoMvcSolid from "../../frameworks/solid/TodoMvcSolid";
import { inject, provide } from "../../frameworks/solid/context";
import type { TodoT } from "../../global";
import type { TodoActions } from "../../frameworks/domain";

export function runSolidImpl(
  name: string,
  useTodoListImpl: () => Accessor<TodoT[]>,
  useActionsImpl: () => TodoActions,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
  Wrapper: (props: { children: JSX.Element, init: TodoT[] }) => JSX.Element = ({ children }) =>
    children
) {
  runTest({
    framework: `solid: ${name}`,
    render: async (init) => {
      inject("storage").set("todo-list", init);
      provide("useTodoList", useTodoListImpl);
      provide("useActions", useActionsImpl);
      await setup(init);

      render(() => (
        <Wrapper init={init}>
          <TodoMvcSolid />
        </Wrapper>
      ));
    },
  });
}
