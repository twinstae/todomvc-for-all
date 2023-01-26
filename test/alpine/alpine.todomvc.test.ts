import { render } from "./render";
// eslint-disable-next-line import/no-unresolved
import todomvcHTML from "../../src/pages/alpine.astro?raw";
import runTest from "../runTest";
import type { TodoT } from "@todomvc-core/global";

runTest({
  framework: `alpine`,
  render: async (init) => {
    const _storage = new Map();
    window.localStorage = {
      getItem(key){
        return _storage.get(key)
      },
      setItem(key, value){
        return _storage.set(key, value)
      },
      get length(){
        return _storage.size
      },
      clear(){
        _storage.clear()
      },
      removeItem(key){
        return _storage.delete(key);
      },
      key(index) {
        return [..._storage.keys()][index]
      },
    }
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
