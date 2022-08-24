import { render, RenderOptions } from "@testing-library/vue";
import type { TodoT } from "../../global";
import TodoMvcVue from '../../frameworks/vue/TodoMVCVue.vue';
import runTest from "../runTest";
import { inject, provide } from "../../frameworks/vue/context";
import { TodoActions } from "../../frameworks/domain";
import type { Ref } from "vue";

export function runVueImpl(
  name: string,
  useTodoListImpl: () => Ref<readonly TodoT[]>,
  actionsImpl: () => TodoActions,
  setup: (init: TodoT[]) => Promise<void> = async () => undefined,
  getOptions: (init: TodoT[]) => RenderOptions = () => ({})
) {
  runTest({
    framework: `svelte: ${name}`,
    render: async (init) => {
      inject("storage").set("todo-list", init);
      provide("useTodoList", useTodoListImpl);
      provide("useActions", actionsImpl);
      await setup(init);

      render(TodoMvcVue, getOptions(init));
    },
  });
}
