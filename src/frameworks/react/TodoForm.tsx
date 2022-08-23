import React, { useState } from "react";
import strs from "../../strs";
import { inject } from "./context";

export default function TodoForm() {
  const { addTodo } = inject("actions");
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
        {strs.addTodoLabel}
        <br />
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
        aria-label={`새로운 할 일 ${todoInput}을 추가하시려면 클릭해주세요`}
      >
        추가
      </button>
    </form>
  );
}
