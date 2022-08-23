import React from "react";
import { inject } from "./context";
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
