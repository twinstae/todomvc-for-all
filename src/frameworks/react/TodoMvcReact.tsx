import React from "react";
import { provide } from "../../dependency";
import { TodoT } from "../../global";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import usePersistState from "./usePersistenceState";

const defaultInit: TodoT[] = [];

function useTodoList(){
  const [todoList, setTodoList] = usePersistState<TodoT[]>(defaultInit, 'todo-list');

  const addTodo = (content: string) => {
    if (content.length === 0) return;
    
    setTodoList((old) => {
      const newTodo = {
        id: Math.max(...old.map(todo => todo.id), 0) + 1,
        content,
        isCompleted: false,
      };
      console.log([...old, newTodo])
      return [...old, newTodo]
    });
  };

  const completeTodo = (targetId: TodoT["id"], isCompleted: boolean) => {
    setTodoList((old) =>
      old.map((todo) =>
        todo.id === targetId ? { ...todo, isCompleted } : todo
      )
    );
  };

  const deleteTodo = (targetId: TodoT["id"]) => {
    setTodoList((old) => old.filter((todo) => todo.id !== targetId));
  };

  const changeTodo = (targetId: TodoT["id"], newContent: string) => {
    setTodoList((old) =>
      old.map((todo) =>
        todo.id === targetId ? { ...todo, content: newContent } : todo
      )
    );
  };

  return {
    todoList,
    addTodo,
    deleteTodo,
    completeTodo,
    changeTodo
  }
}

export default function TodoMvcReact() {
  const {
    todoList,
    addTodo,
    deleteTodo,
    completeTodo,
    changeTodo
  } = useTodoList();

  return (
    <div className="card shadow-lg rounded-2xl p-4 max-w-lg">
      <TodoForm addTodo={addTodo} />
      <ul>
        {todoList.map((todo) => (
          <TodoItem
            key={todo.content}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            changeTodo={changeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

provide('storage', {
  get: (key: string) => {
    const saved = localStorage.getItem(key);
    if(!saved) return undefined;
    
    return JSON.parse(saved);
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
});