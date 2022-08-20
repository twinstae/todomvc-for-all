import React, { useState } from "react";
import { TodoT } from "../../global";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const defaultInit: TodoT[] = [];

let nowId = 0;

export default function TodoMvcReact({ init }: { init: TodoT[] }) {
  const [todoList, setTodoList] = useState<TodoT[]>(init || defaultInit);

  const addTodo = (content: string) => {
    if (content.length === 0) return;
    const newTodo = { id: nowId++, content, isCompleted: false };
    setTodoList((old) => [...old, newTodo]);
  };

  const completeTodo = (targetId: TodoT["id"], isCompleted: boolean) => {
    setTodoList((old) =>
      old.map((todo) =>
        todo.id === targetId ? { ...todo, isCompleted } : todo
      )
    );
  };

  const deleteTodo = (targetId: TodoT["id"]) => {
    setTodoList((old) => old.filter((todo) => todo.id !== targetId));
  };

  const changeTodo = (targetId: TodoT["id"], newContent: string) => {
    setTodoList((old) =>
      old.map((todo) =>
        todo.id === targetId ? { ...todo, content: newContent } : todo
      )
    );
  };
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
