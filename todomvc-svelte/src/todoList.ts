
import { writable } from "svelte/store";
import type { TodoT } from "@core/global";
import { domain } from "@core/domain";
import { inject } from "@core/sharedContainer";
import { createActionsWithSetState } from "@core/createActionsWithSetState";

const saved = inject('storage').get('todo-list') as TodoT[] | undefined;
export const todoList = writable<TodoT[]>(saved || []);

export const todoListActions = createActionsWithSetState(todoList.update, domain)

todoList.subscribe((v) =>{
  inject('storage').set('todo-list', v);
})