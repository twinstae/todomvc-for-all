import { render } from "@testing-library/svelte";

import type { TodoActions } from "@todomvc-core/domain";
import type { TodoT } from "@todomvc-core/global";
import AppWithDependency from '../src/AppWithDependency.svelte';
import runTest from "../../test/runTest";
import type { Subscribable } from "../src/context";

export function runSvelteImpl(
  name: string,
  todoListImpl: Subscribable<TodoT[]>,
  actionsImpl: TodoActions,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
) {
  runTest({
    framework: `svelte: ${name}`,
    render: async (init) => {
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
