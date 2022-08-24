import { render } from "solid-testing-library";
import type { Accessor } from "solid-js";

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
) {
  runTest({
    framework: `react: ${name}`,
    render: async (init) => {
      inject("storage").set("todo-list", init);
      provide("useTodoList", useTodoListImpl);
      provide("useActions", useActionsImpl);
      await setup(init);

      render(TodoMvcSolid);
    },
  });
}
