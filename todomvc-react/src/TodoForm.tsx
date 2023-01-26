import React, { useState } from "react";
import strs from "@todomvc-core/strs";
import { useActions } from "@todomvc-react/useActions";

export default function TodoForm() {
  const { addTodo } = useActions();
  const [todoInput, setTodoInput] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(todoInput.trim());
        setTodoInput("");
      }}
      className="p-0 m-0"
    >
      <label className="inline-block grow">
        {strs.addTodoLabel}
        <br />
        <input
          type="text"
          value={todoInput}
          className="input input-bordered w-full"
          onChange={(e) => setTodoInput(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        aria-label={`새로운 할 일 ${todoInput}을 추가하시려면 클릭해주세요`}
      >
        추가
      </button>
    </form>
  );
}
