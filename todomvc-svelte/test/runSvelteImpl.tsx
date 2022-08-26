import { render } from "@testing-library/svelte";

import AppWithDependency from '@todomvc-svelte/AppWithDependency.svelte';
import runTest from "../../test/runTest";
import type { TodoT } from "@todomvc-core/global";
import * as shared from "@todomvc-core/sharedContainer";
import type { Subscribable } from "@todomvc-svelte/context";
import type { TodoActions } from "@todomvc-core/domain";

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
