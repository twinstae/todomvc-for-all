import { domain } from "./domain";
import type { TodoT } from "./global";

const TODO: TodoT = {
  content: "test",
  id: 1,
  isCompleted: false,
};

const TODO_2: TodoT = {
  content: "test2",
  id: 2,
  isCompleted: false,
};

describe("todoMVC domain", () => {
  it("addTodo", () => {
    const result = domain.addTodo([], TODO.content);

    expect(result).toStrictEqual([TODO]);
    expect(domain.addTodo([], "")).toStrictEqual([]);
  });

  it("completeTodo", () => {
    const result = domain.completeTodo([TODO, TODO_2], TODO.id, true);

    expect(result[0].isCompleted).toBe(true);
    expect(result[1]).toEqual(TODO_2);
  });

  it("changeTodo", () => {
    const result = domain.changeTodo([TODO, TODO_2], TODO.id, 'rabbit');

    expect(result[0].content).toBe('rabbit');
    expect(result[1]).toEqual(TODO_2);
  });

  it("deleteTodo", () => {
    const result = domain.deleteTodo([TODO, TODO_2], TODO.id);
    expect(result).toStrictEqual([TODO_2]);
  });
});
