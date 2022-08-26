// eslint-disable-next-line import/no-unresolved
import todomvcHTML from "../../src/pages/ts.astro?raw";
import runTest from "../runTest";
import start from "../../src/pages/todomvc";
import { reduxStore, loadSaved } from "@todomvc-core/reduxTodoListStore";
import { todoListStore } from "@todomvc-core/nanoTodoListStore";

runTest({
  framework: `Typescript`,
  render: async (init) => {
    reduxStore.dispatch(loadSaved({ saved: init }));
    todoListStore.set(init);

    document.body.innerHTML = todomvcHTML;
    start();
  },
});
