import { render } from "./render";
// eslint-disable-next-line import/no-unresolved
import todomvcHTML from "../../frameworks/alpine/alpine-todomvc.html?raw";
import runTest from "../runTest";
import { TodoT } from "../../global";

runTest({
  framework: `alpine`,
  render: async (init) => {
    render(todomvcHTML);
    const app = document.getElementById("app")
    if (app){
      app.dispatchEvent(
        new CustomEvent<{ todoList: TodoT[] }>("notify", {
          detail: { todoList: init },
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );
    }
  },
});
