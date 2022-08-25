import { render, RenderOptions } from "@testing-library/vue";
import type { TodoT } from "../../src/global";
import TodoMvcVue from '../src/TodoMVCVue.vue';
import runTest from "../../test/runTest";
import * as shared from "../../src/sharedContainer";
import { provide } from "../src/context";
import { TodoActions } from "../../src/domain";
import type { Ref } from "vue";

export function runVueImpl(
  name: string,
  useTodoListImpl: () => Ref<readonly TodoT[]>,
  actionsImpl: () => TodoActions,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
  getOptions: (init: TodoT[]) => RenderOptions = () => ({})
) {
  runTest({
    framework: `vue: ${name}`,
    render: async (init) => {
      shared.inject("storage").set("todo-list", init);
      provide("useTodoList", useTodoListImpl);
      provide("useActions", actionsImpl);
      await setup(init);

      render(TodoMvcVue, getOptions(init));
    },
  });
}
