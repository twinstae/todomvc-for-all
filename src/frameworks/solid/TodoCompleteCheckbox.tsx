/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */
import type { TodoT } from "../../global";
import { inject } from "./context";

export default function TodoCompleteCheckbox({
  todo,
  checkboxId,
}: {
  todo: TodoT;
  checkboxId: string;
}) {
  const { completeTodo } = inject("useActions")();

  return (
    <input
      id={checkboxId}
      type="checkbox"
      class="checkbox checkbox-lg mr-2 self-center"
      aria-label={`할일 ${todo.content}을 완료하시려면 클릭하세요.`}
      checked={todo.isCompleted}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          const checkbox = e.target as HTMLInputElement;
          completeTodo(todo.id, !checkbox.checked);
        }
      }}
      onChange={(e) => completeTodo(todo.id, (e.target as HTMLInputElement).checked)}
    />
  );
}