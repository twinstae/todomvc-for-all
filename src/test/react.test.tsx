import React from "react";
import { render } from "@testing-library/react";
import TodoMvcReact from "../frameworks/react/TodoMvcReact";

import runTest from "./runTest";
import { provide, withSubscribe } from "../frameworks/react/context";
import {
  store,
  useValtioTodoList,
} from "../frameworks/react/useValtioTodoList";
import { useReactTodoList } from "../frameworks/react/useTodoList";
import { useNanoTodoList } from "../frameworks/react/useNanoTodolist";

runTest({
  framework: "react: state",
  render: (init) => {
    provide("storage", withSubscribe(new Map([["todo-list", init]])));

    provide("useTodoList", useReactTodoList);

    render(<TodoMvcReact />);
  },
});

runTest({
  framework: "react: valtio",
  render: (init) => {
    provide("storage", withSubscribe(new Map([["todo-list", init]])));

    store.todoList = init;
    provide("useTodoList", useValtioTodoList);

    render(<TodoMvcReact />);
  },
});

runTest({
  framework: "react: nanostore",
  render: (init) => {
    provide("storage", withSubscribe(new Map([["todo-list", init]])));

    provide("useTodoList", useNanoTodoList);

    render(<TodoMvcReact />);
  },
});
