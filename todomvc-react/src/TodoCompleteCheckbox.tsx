import React from "react";
import type { TodoT } from "../../src/global";
import { useActions } from "./useActions";

export default function TodoCompleteCheckbox({
  todo,
  checkboxId,
}: {
  todo: TodoT;
  checkboxId: string;
}) {
  const { completeTodo } = useActions();

  return (
    <input
      id={checkboxId}
      type="checkbox"
      className="checkbox checkbox-lg mr-2 self-center"
      aria-label={`할일 ${todo.content}을 완료하시려면 클릭하세요.`}
      checked={todo.isCompleted}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          const checkbox = e.target as HTMLInputElement;
          completeTodo(todo.id, !checkbox.checked);
        }
      }}
      onChange={(e) => completeTodo(todo.id, e.target.checked)}
    />
  );
}
