import { render, RenderOptions } from "@testing-library/vue";
import type { Ref } from "vue";
import type { TodoT } from "@todomvc-core/global";
import { TodoActions } from "@todomvc-core/domain";
import App from '../src/App.vue';
import runTest from "../../test/runTest";
import { useTodoListKey } from '../src/useTodoList';
import { useActionsKey } from '../src/useActions';

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
