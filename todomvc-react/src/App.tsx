import React from "react";
import TodoForm from "@todomvc-react/TodoForm";
import TodoItem from "@todomvc-react/TodoItem";
import { useTodoList } from "@todomvc-react/useTodoList";

export default function App() {
  const { todoList } = useTodoList();

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
