import React from "react";
import { localStorageWithSubscribe } from "../Storage";
import { inject, provide } from "./context";
import { nanoActions, useNanoTodoList } from "./hooks/useNanoTodolist";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoMvcReact() {
  const { todoList } = inject("useTodoList")();

  return (
    <div className="card shadow-lg rounded-2xl p-4 max-w-lg">
      <TodoForm />
      <ul>
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}


provide(
  "storage",
  localStorageWithSubscribe,
);
provide("useTodoList", useNanoTodoList);
provide("useActions", () => nanoActions);