import React from "react";
import { JsonValue } from "../../json";
import { inject, provide, withSubscribe } from "./context";
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
          <TodoItem key={todo.content} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

const localStorageWithSubscribe = withSubscribe({
  get(key: string) {
    const saved = localStorage.getItem(key);
    if (!saved) return undefined;

    return JSON.parse(saved);
  },
  set(key: string, value: JsonValue) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  delete(key: string){
    localStorage.removeItem(key);
  }
});

provide(
  "storage",
  localStorageWithSubscribe,
);
provide("useTodoList", useNanoTodoList);
provide("actions", () => nanoActions);