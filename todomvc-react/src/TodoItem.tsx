import React from "react";
import type { TodoT } from "@todomvc-core/global";
import TodoCompleteCheckbox from "@todomvc-react/TodoCompleteCheckbox";
import TodoDeleteButton from "@todomvc-react/TodoDeleteButton";
import TodoEditingForm from "@todomvc-react/TodoEditingForm";
import { useActions } from "@todomvc-react/useActions";

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
