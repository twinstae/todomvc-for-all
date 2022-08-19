import React, { useState } from "react";
import { TodoT } from "../../global";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: TodoT;
  completeTodo: (todoId: TodoT["id"], isCompleted: boolean) => void;
  deleteTodo: (todoId: TodoT["id"]) => void;
}

function TodoItem({ todo, completeTodo, deleteTodo }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        aria-label={`완료하기 ${todo.content} `}
        checked={todo.isCompleted}
        onChange={(e) => completeTodo(todo.id, e.target.checked)}
      />
      {todo.content}
      <button
        onClick={() => deleteTodo(todo.id)}
        aria-label={`삭제하기 ${todo.content}`}
      >
        X
      </button>
    </li>
  );
}

const defaultInit: TodoT[] = [];

let nowId = 0;

export default function TodoMvcReact({ init }: { init: TodoT[] }) {
  const [todoList, setTodoList] = useState<TodoT[]>(init || defaultInit);

  const addTodo = (content: string) => {
    const newTodo = { id: nowId++, content, isCompleted: false };
    setTodoList((old) => [...old, newTodo]);
  };

  const completeTodo = (todoId: TodoT["id"], isCompleted: boolean) => {
    setTodoList((old) =>
      old.map((todo) => (todo.id === todoId ? { ...todo, isCompleted } : todo))
    );
  };

  const deleteTodo = (todoId: TodoT["id"]) => {
    setTodoList((old) => old.filter((todo) => todo.id !== todoId));
  };
  return (
    <>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.content}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}
