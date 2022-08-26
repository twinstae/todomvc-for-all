/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { For } from 'solid-js';
import TodoDeleteButton from './TodoDeleteButton';
import TodoForm from './TodoForm';
import TodoCompleteCheckbox from './TodoCompleteCheckbox';
import TodoEditingForm from './TodoEditingForm';
import { inject } from './context';

export default function App() {
  const todoList = inject('useTodoList')();
  
  return (
    <div class="card shadow-lg rounded-2xl p-4 max-w-lg">
      <TodoForm />
      <ul>
        <For each={todoList()}>{(todo) =>
        <li class="mt-1 flex align-middle">
          <TodoCompleteCheckbox todo={todo} checkboxId={"todo-checkbox-" + todo.id} />
          <TodoEditingForm todo={todo} checkboxId={"todo-checkbox-" + todo.id} />
          <TodoDeleteButton todo={todo} />
        </li>
      }</For>
      </ul>
    </div>
  );
}