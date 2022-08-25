import type { TodoT } from "../../src/global";
import { writable } from "svelte/store";
import { createActionsWithSetState } from "../../src/createActionsWithSetState";
import { domain } from "../../src/domain";
import { inject } from "../../src/sharedContainer";

export const todoList = writable<TodoT[]>(inject('storage').get('todo-list') || []);

export const todoListActions = createActionsWithSetState(todoList.update, domain)

todoList.subscribe((v) =>{
  inject('storage').set('todo-list', v);
})