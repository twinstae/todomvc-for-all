import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodoList } from "./useTodoList";

// 배열의 구조분해할당 => 순서
// 객체의 구조분해할당 => key의 이름

export default function App() {
  const { todoList } = useTodoList();

  return (
    <div className="card shadow-lg rounded-2xl p-4 max-w-lg">
      <TodoForm />
      <ul>
        {todoList.map((todo) => (
          <TodoItem todo={todo} key={todo.id}/>
        ))}
      </ul>
    </div>
  );
}
