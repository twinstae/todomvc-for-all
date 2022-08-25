import { render } from "@testing-library/svelte";

import App from '../src/App.svelte';
import runTest from "../../test/runTest";
import type { TodoT } from "../../src/global";
import * as shared from "../../src/sharedContainer";
import { provide, Subscribable } from "../src/context";
import { TodoActions } from "../../src/domain";

export function runSvelteImpl(
  name: string,
  todoListImpl: Subscribable<TodoT[]>,
  actionsImpl: TodoActions,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
) {
  runTest({
    framework: `svelte: ${name}`,
    render: async (init) => {
      shared.inject("storage").set("todo-list", init);
      provide("todoList", todoListImpl);
      provide("actions", actionsImpl);
      await setup(init);

      render(App);
    },
  });
}
