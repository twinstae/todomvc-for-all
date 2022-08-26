/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { TodoT } from "@todomvc-core/global";
import { inject } from "./context";

export default function TodoDeleteButton(props: { todo: TodoT }) {
  const { deleteTodo } = inject("useActions")();

  return (
    <button
      type="button"
      class="btn btn-error btn-sm m-2 mr-0"
      onClick={() => deleteTodo(props.todo.id)}
      aria-label={`할일 ${props.todo.content}을 삭제하시려면 클릭하시거나 Delete 키를 누르세요.`}
    >
      삭제
    </button>
  );
}