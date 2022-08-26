import React from "react";
import type { TodoT } from "@core/global";
import { useActions } from "@/useActions";

export default function TodoDeleteButton({ todo }: { todo: TodoT }) {
  const { deleteTodo } = useActions();;

  return (
    <button
      type="button"
      className="btn btn-error btn-sm m-2 mr-0"
      onClick={() => deleteTodo(todo.id)}
      aria-label={`할일 ${todo.content}을 삭제하시려면 클릭하시거나 Delete 키를 누르세요.`}
    >
      삭제
    </button>
  );
}
