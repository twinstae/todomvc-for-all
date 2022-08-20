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
      className="p-0 m-0"
    >
      <label className="inline-block  grow">
        {strs.addTodoLabel}<br/>
        <input
          type="text"
          value={todoInput}
          className="input input-bordered w-full"
          placeholder="react 공부하기"
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="btn btn-primary btn-sm m-2"
        aria-label={`추가 ${todoInput}`}
      >
        완료
      </button>
    </form>
  );
}
