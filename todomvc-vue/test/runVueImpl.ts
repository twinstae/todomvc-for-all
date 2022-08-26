import { render, RenderOptions } from "@testing-library/vue";
import type { TodoT } from "../../todomvc-core/global";
import App from '../src/App.vue';
import runTest from "../../test/runTest";
import * as shared from "../../src/sharedContainer";
import { TodoActions } from "../../src/domain";
import { useTodoListKey } from '../src/useTodoList';
import { useActionsKey } from '../src/useActions';
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
      await setup(init);

      const options = getOptions(init);
      if(options.global === undefined){
        options.global = {}
      }
      options.global.provide = {
        [useTodoListKey]: useTodoListImpl,
        [useActionsKey]: actionsImpl,
      }

      render(App, options);
    },
  });
}
