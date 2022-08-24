import React from "react";
import { inject, provide, withSubscribe } from "./context";
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

provide(
  "storage",
  withSubscribe({
    get(key: string) {
      const saved = localStorage.getItem(key);
      if (!saved) return undefined;

      return JSON.parse(saved);
    },
    set(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  })
);
