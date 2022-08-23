import React from "react";
import { render } from "@testing-library/react";
import TodoMvcReact from "../frameworks/react/TodoMvcReact";

import runTest from "./runTest";
import { provide, withSubscribe } from "../frameworks/react/context";
import {
  store,
  useValtioTodoList,
} from "../frameworks/react/useValtioTodoList";

runTest({
  framework: "react",
  render: (init) => {
    const _storage = new Map([["todo-list", init]]);
    provide("storage", withSubscribe(_storage));

    store.todoList = init;
    provide("useTodoList", useValtioTodoList);

    render(<TodoMvcReact />);
  },
});
