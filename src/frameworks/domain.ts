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
  completeTodo(old: TodoT[], id: number, isCompleted: boolean) {
    const todo = old.find((todo) => todo.id === id);
    if (todo) {
      todo.isCompleted = isCompleted;
    }
    return [...old];
  },
  changeTodo(old: TodoT[], id: number, newContent: string) {
    const todo = old.find((todo) => todo.id === id);
    if (todo) {
      todo.content = newContent;
    }
    return [...old];
  },
  deleteTodo(old: TodoT[], id: number) {
    return old.filter((todo) => todo.id !== id);
  }
}