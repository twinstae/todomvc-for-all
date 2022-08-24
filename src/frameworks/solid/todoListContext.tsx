/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */
import type { JSX } from "solid-js/types/jsx";

import { createContext, useContext } from "solid-js";
import { createStore } from 'solid-js/store';
import { TodoT } from "../../global";
import { domain, TodoActions } from "../domain";

const TodoListContext = createContext();
const TodoActionsContext = createContext();

export function TodoListWrapper(props: { children: JSX.Element, init: TodoT[] }) {
  const [todoList, setTodoList] = createStore<TodoT[]>(props.init || []);

  const actions: TodoActions = {
    addTodo(content){
      setTodoList(domain.addTodo(todoList, content));
    },
    completeTodo(id, isCompleted){
      setTodoList(todoList.findIndex(todo => todo.id === id), 'isCompleted', isCompleted)
    },
    changeTodo(id, content){
      setTodoList(todoList.findIndex(todo => todo.id === id), 'content', content)
    },
    deleteTodo(id){
      setTodoList(domain.deleteTodo(todoList, id));
    }
  }
  return (
    <TodoListContext.Provider value={todoList}>
      <TodoActionsContext.Provider value={actions}>
        {props.children}
      </TodoActionsContext.Provider>
    </TodoListContext.Provider>
  );
}

export function useTodoList() {
  return () => useContext(TodoListContext) as TodoT[];
}
export function useTodoActions() {
  return useContext(TodoActionsContext) as TodoActions;
}