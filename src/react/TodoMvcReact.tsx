import React, { useState } from "react";

type TodoT = string;

interface TodoItemProps {
    todo: TodoT;
}

function TodoItem({ todo }: TodoItemProps) {
  return <li key={todo}>{todo}</li>;
}

function TodoMvcReact() {
  const [todoList, setTodoList] = useState(["투두 상태 구현", "마크업", "어쩌구"]);
  return (
    <>
      <h1>Todo MVC</h1>
      <ul>
        {todoList.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </>
  );
}

export default TodoMvcReact;
