/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { createSignal } from 'solid-js';
import strs from '../../src/strs';
import { inject } from './context';

export default function TodoForm() {
  const { addTodo } = inject("useActions")();
  const [todoInput, setTodoInput] = createSignal("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(todoInput());
        setTodoInput("");
      }}
      class="p-0 m-0"
    >
      <label class="inline-block  grow">
        {strs.addTodoLabel}
        <br />
        <input
          type="text"
          value={todoInput()}
          onInput={(e) => setTodoInput(e.currentTarget.value)}
          class="input input-bordered w-full"
          placeholder="react 공부하기"
        />
      </label>
      <button
        type="submit"
        class="btn btn-primary btn-sm m-2"
        aria-label={`새로운 할 일 ${todoInput()}을 추가하시려면 클릭해주세요`}
      >
        추가
      </button>
    </form>
  );
}