import React from "react";
import type { TodoT } from "@core/global";
import TodoCompleteCheckbox from "@/TodoCompleteCheckbox";
import TodoDeleteButton from "@/TodoDeleteButton";
import TodoEditingForm from "@/TodoEditingForm";
import { useActions } from "@/useActions";

interface TodoItemProps {
  todo: TodoT;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo } = useActions();

  const checkboxId = "todo-checkbox-" + todo.id;
  return (
    <li
      className="mt-1 flex align-middle"
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
