/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import type { TodoT } from "@todomvc-core/global";
import { inject } from "./context";

export default function TodoCompleteCheckbox(props: {
  todo: TodoT;
  checkboxId: string;
}) {
  const { completeTodo } = inject("useActions")();

  return (
    <input
      id={props.checkboxId}
      type="checkbox"
      class="checkbox checkbox-lg mr-2 self-center"
      aria-label={`할일 ${props.todo.content}을 완료하시려면 클릭하세요.`}
      checked={props.todo.isCompleted}
      onkeyup={(e) => {
        if (e.key === "Space") {
          const checkbox = e.target as HTMLInputElement;
          completeTodo(props.todo.id, !checkbox.checked);
        }
      }}
      onChange={(e) => {
        completeTodo(props.todo.id, (e.target as HTMLInputElement).checked)
      }}
    />
  );
}