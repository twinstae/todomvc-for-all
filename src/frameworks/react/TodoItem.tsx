import React, { useState, useRef, useEffect } from "react";
import { TodoT } from "../../global";
import { inject } from "./context";
import TodoDeleteButton from "./TodoDeleteButton";

interface TodoItemProps {
  todo: TodoT;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo, changeTodo, completeTodo } = inject("actions")();
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

  const checkboxId = 'todo-checkbox-'+todo.id;
  return (
    <li
      className="mt-1 flex align-middle "
      onKeyUp={(e) => {
        if (e.key === "Delete") deleteTodo(todo.id);
      }}
    >
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
      <label htmlFor={checkboxId} className="label cursor-pointer p-0 grow">
        <span className="label-text w-full pl-5" hidden={isEditing}>
          {todo.content}
        </span>
      </label>
      <form
        className="flex align-middle m-0"
        onSubmit={(e) => {
          e.preventDefault();
          changeTodo(todo.id, editInput);
          setIsEditing(false);
        }}
      >
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
            aria-label={`할일을 ${todo.content}에서 ${editInput}로 수정하시려면 클릭하세요.`}
          >
            완료
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm m-2"
            onClick={() => startEdit()}
            aria-label={`할일 ${todo.content}을 수정하시려면 클릭하세요.`}
          >
            수정
          </button>
        )}
        <TodoDeleteButton todo={todo} />
      </form>
    </li>
  );
}
