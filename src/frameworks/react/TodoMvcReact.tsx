import React from "react";
import { provide } from "../../dependency";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodoList } from "./useTodoList";

export default function TodoMvcReact() {
  const {
    todoList,
    addTodo,
    deleteTodo,
    completeTodo,
    changeTodo
  } = useTodoList();

  return (
    <div className="card shadow-lg rounded-2xl p-4 max-w-lg">
      <TodoForm addTodo={addTodo} />
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.content}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            changeTodo={changeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

provide('storage', {
  get: (key: string) => {
    const saved = localStorage.getItem(key);
    if(!saved) return undefined;
    
    return JSON.parse(saved);
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
});