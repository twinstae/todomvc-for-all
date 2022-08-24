/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { createSignal, Show } from "solid-js";
import type { TodoT } from "../../global";
import { inject } from "./context";

export default function TodoEditingForm({
  todo,
  checkboxId,
}: {
  todo: TodoT;
  checkboxId: string;
}) {
  const [editInput, setEditInput] = createSignal(todo.content);
  const [isEditing, setIsEditing] = createSignal(false);
  let editRef: HTMLInputElement | undefined;
  const startEdit = () => {
    editRef?.focus();
    setIsEditing(true);
  };

  const { changeTodo } = inject("useActions")();

  return (
    <>
      <label for={checkboxId} class="label cursor-pointer p-0 grow">
        <span class="label-text w-full pl-5" hidden={isEditing()}>
          {todo.content}
        </span>
      </label>
      <form
        class="flex align-middle m-0"
        onSubmit={(e) => {
          e.preventDefault();
          changeTodo(todo.id, editInput());
          setIsEditing(false);
        }}
      >
        <input
          hidden={!isEditing}
          ref={editRef}
          type="text"
          placeholder={todo.content}
          value={editInput()}
          class="input input-bordered input-sm w-full m-2"
          onChange={(e) => {
            if (isEditing()) setEditInput((e.target as HTMLInputElement).value);
          }}
        />
        <Show
          when={isEditing()}
          fallback={
            <button
              type="button"
              class="btn btn-primary btn-sm m-2"
              onClick={() => startEdit()}
              aria-label={`할일 ${todo.content}을 수정하시려면 클릭하세요.`}
            >
              수정
            </button>
          }
        >
          <button
            type="submit"
            class="btn btn-primary btn-sm m-2"
            aria-label={`할일을 ${
              todo.content
            }에서 ${editInput()}로 수정하시려면 클릭하세요.`}
          >
            완료
          </button>
        </Show>
      </form>
    </>
  );
}
