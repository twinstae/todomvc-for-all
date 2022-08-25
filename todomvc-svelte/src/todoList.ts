import type { TodoT } from "../../src/global";
import { writable } from "svelte/store";
import { createActionsWithSetState } from "../../src/createActionsWithSetState";
import { domain } from "../../src/domain";

export const todoList = writable<TodoT[]>([]);

export const todoListActions = createActionsWithSetState(todoList.update, domain)
