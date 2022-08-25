/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { render } from "solid-testing-library";
import type { Accessor } from "solid-js";
import type { JSX } from "solid-js/types/jsx";

import runTest from "../../test/runTest";
import TodoMvcSolid from "../src/TodoMvcSolid";
import { provide } from "../src/context";
import * as shared from "../../src/sharedContainer";
import type { TodoT } from "../../src/global";
import type { TodoActions } from "../../src/domain";

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
      shared.inject("storage").set("todo-list", init);
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