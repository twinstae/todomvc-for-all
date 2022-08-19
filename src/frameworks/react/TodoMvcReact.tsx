import React, { useState } from "react";
import TodoForm from "./TodoForm";

type TodoT = {
  content: string;
};

interface TodoItemProps {
  todo: TodoT;
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      <input type="checkbox" aria-label={`완료하기 ${todo.content} `} />
      {todo.content}
    </li>
  );
}

export default function TodoMvcReact() {
  const [todoList, setTodoList] = useState<TodoT[]>([]);

  const addTodo = (content: string) => setTodoList((old) => [...old, { content }]);
  return (
    <>
      <h1>Todo MVC</h1>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todoList.map((todo) => (
          <TodoItem key={todo.content} todo={todo} />
        ))}
      </ul>
    </>
  );
}
