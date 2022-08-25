import React from "react";
import { inject } from "./context";
// import { provide } from "./context";
// import { localStorageWithSubscribe } from "../Storage";
// import { nanoActions, useNanoTodoList } from "./hooks/useNanoTodolist";
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
