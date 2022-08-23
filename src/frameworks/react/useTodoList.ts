import { TodoT } from "../../global";
import { generateId } from "./generateId";
import usePersistState from "./usePersistenceState";

const defaultInit: TodoT[] = [];

export function useReactTodoList(){
  const [todoList, setTodoList] = usePersistState<readonly TodoT[]>(defaultInit, 'todo-list');

  const addTodo = (content: string) => {
    if (content.length === 0) return;
    
    setTodoList((old) => {
      const newTodo = {
        id: generateId(),
        content,
        isCompleted: false,
      };
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
