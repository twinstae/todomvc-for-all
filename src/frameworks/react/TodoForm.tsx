import React, { useState } from "react";
import strs from "../../strs";

interface TodoFormProps {
  addTodo: (content: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [todoInput, setTodoInput] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(todoInput);
        setTodoInput("");
      }}
    >
      <label>
        {strs.addTodoLabel}
        <input
          type="text"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </label>
    </form>
  );
}
