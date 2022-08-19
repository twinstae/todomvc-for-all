import React, { useState } from "react";
import strs from "../../strs";
import TodoForm from "./TodoForm";

type TodoT = string;

interface TodoItemProps {
  todo: TodoT;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li key={todo}>
      <input type="checkbox" aria-label={`완료하기 ${todo} `} />
      {todo}
    </li>
  );
}

export default function TodoMvcReact() {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = (content: string) => setTodoList((old) => [...old, content]);
  return (
    <>
      <h1>Todo MVC</h1>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todoList.map((todo) => (
          <TodoItem key={todo} todo={todo} />
        ))}
      </ul>
    </>
  );
}
