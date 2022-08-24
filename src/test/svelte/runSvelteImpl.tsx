import { render } from "@testing-library/svelte";

import TodoMvcSvelte from '../../frameworks/svelte/TodoMVCSvelte.svelte';
import runTest from "../runTest";
import type { TodoT } from "../../global";
import { inject, provide, Subscribable } from "../../frameworks/svelte/context";
import { TodoActions } from "../../frameworks/domain";

export function runSvelteImpl(
  name: string,
  todoListImpl: Subscribable<TodoT[]>,
  actionsImpl: TodoActions,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
) {
  runTest({
    framework: `svelte: ${name}`,
    render: async (init) => {
      inject("storage").set("todo-list", init);
      provide("todoList", todoListImpl);
      provide("actions", actionsImpl);
      await setup(init);

      render(TodoMvcSvelte);
    },
  });
}
