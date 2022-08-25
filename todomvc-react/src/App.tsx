import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodoList } from "./useTodoList";

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
