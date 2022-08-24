import { TodoT } from "../global";
import { generateId } from "./generateId";

export const domain = {
  addTodo(old: TodoT[], content: string) {
    const newTodo = {
      id: generateId(),
      content,
      isCompleted: false,
    };
    return [...old, newTodo];
  },
  completeTodo(old: TodoT[], id: TodoT["id"], isCompleted: boolean) {
    return old.map((todo) =>
      todo.id === id ? { ...todo, isCompleted } : todo
    );
  },
  changeTodo(old: TodoT[], id: TodoT["id"], content: string) {
    return old.map((todo) => (todo.id === id ? { ...todo, content } : todo));
  },
  deleteTodo(old: TodoT[], id: TodoT["id"]) {
    return old.filter((todo) => todo.id !== id);
  },
};

export type TodoActions = {
  addTodo(content: string): void;
  completeTodo(id: TodoT["id"], isCompleted: boolean): void;
  changeTodo(id: TodoT["id"], newContent: string): void;
  deleteTodo(id: TodoT["id"]): void;
};
