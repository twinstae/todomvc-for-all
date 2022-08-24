import React from "react";
import type { TodoT } from "../../global";
import { inject } from "./context";
import TodoCompleteCheckbox from "./TodoCompleteCheckbox";
import TodoDeleteButton from "./TodoDeleteButton";
import TodoEditingForm from "./TodoEditingForm";

interface TodoItemProps {
  todo: TodoT;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo } = inject("actions")();

  const checkboxId = "todo-checkbox-" + todo.id;
  return (
    <li
      className="mt-1 flex align-middle "
      onKeyUp={(e) => {
        if (e.key === "Delete") deleteTodo(todo.id);
      }}
    >
      <TodoCompleteCheckbox checkboxId={checkboxId} todo={todo} />
      <TodoEditingForm checkboxId={checkboxId} todo={todo} />
      <TodoDeleteButton todo={todo} />
    </li>
  );
}
