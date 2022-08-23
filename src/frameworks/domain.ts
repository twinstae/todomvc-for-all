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
    return old.map((todo) => todo.id === id
      ? { ...todo, isCompleted }
      : todo
    );
  },
  changeTodo(old: TodoT[], id: number, content: string) {
    return old.map((todo) => todo.id === id
      ? { ...todo, content }
      : todo
    );
  },
  deleteTodo(old: TodoT[], id: number) {
    return old.filter((todo) => todo.id !== id);
  }
}