import React, { useState } from "react";
import strs from "../../strs";

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
  const [todoInput, setTodoInput] = useState('');
  return (
    <>
      <h1>Todo MVC</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        setTodoList((old) => [...old, todoInput]);
        setTodoInput('');
      }}>
        <label>
          {strs.addTodoLabel}
          <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)}/>
        </label>
      </form>
      <ul>
        {todoList.map((todo) => (
          <TodoItem key={todo} todo={todo} />
        ))}
      </ul>
    </>
  );
}
