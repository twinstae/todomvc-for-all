import React, { useState, useRef, useEffect } from "react";
import { TodoT } from "../../global";

interface TodoItemProps {
  todo: TodoT;
  completeTodo: (todoId: TodoT["id"], isCompleted: boolean) => void;
  deleteTodo: (todoId: TodoT["id"]) => void;
  changeTodo: (todoId: TodoT["id"], content: string) => void;
}

export default function TodoItem({
  todo,
  completeTodo,
  deleteTodo,
  changeTodo,
}: TodoItemProps) {
  const [editInput, setEditInput] = useState(todo.content);
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus();
    }
  }, [isEditing]);

  const startEdit = () => {
    if (!isEditing) setTimeout(() => setIsEditing(true), 10);
  };
  
  return (
    <li className="mt-1">
      <form
        className="flex align-middle m-0"
        onSubmit={(e) => {
          e.preventDefault();
          changeTodo(todo.id, editInput);
          setIsEditing(false);
        }}
      >
        <label className="flex align-middle label cursor-pointer p-0 grow">
          <input
            type="checkbox"
            className="checkbox checkbox-lg mr-2"
            aria-label={`완료하기 ${todo.content}`}
            checked={todo.isCompleted}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const checkbox = e.target as HTMLInputElement;
                completeTodo(todo.id, !checkbox.checked);
              }
            }}
            onChange={(e) => completeTodo(todo.id, e.target.checked)}
          />
          <span className="label-text w-full pl-5" hidden={isEditing}>
            {todo.content}
          </span>
        </label>
        <input
          hidden={!isEditing}
          ref={editRef}
          type="text"
          placeholder={todo.content}
          value={editInput}
          className="input input-bordered input-sm w-full m-2"
          onChange={(e) => {
            if (isEditing) setEditInput(e.target.value);
          }}
        />
        {isEditing ? (
          <button
            type="submit"
            className="btn btn-primary btn-sm m-2"
            aria-label={`완료 ${editInput}`}
          >
            완료
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm m-2"
            onClick={() => startEdit()}
            aria-label={`수정 ${todo.content}`}
          >
            수정
          </button>
        )}
        <button
          type="button"
          className="btn btn-error btn-sm m-2 mr-0"
          onClick={() => deleteTodo(todo.id)}
          aria-label={`삭제 ${todo.content}`}
        >
          삭제
        </button>
      </form>
    </li>
  );
}
