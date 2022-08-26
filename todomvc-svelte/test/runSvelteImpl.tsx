import { render } from "@testing-library/svelte";

import AppWithDependency from '../src/AppWithDependency.svelte';
import runTest from "../../test/runTest";
import type { TodoT } from "../../todomvc-core/global";
import * as shared from "../../src/sharedContainer";
import { Subscribable } from "../src/context";
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
      await setup(init);

      render(AppWithDependency, {
        props: {
          todoListStore: todoListImpl,
          actions: actionsImpl,
        }
      });
    },
  });
}
