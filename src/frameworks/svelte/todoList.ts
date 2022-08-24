import type { TodoT } from "../../global";
import { writable } from "svelte/store";
import { createActionsWithSetState } from "../createActionsWithSetState";
import { domain } from "../domain";

export const todoList = writable<TodoT[]>([]);

export const todoListActions = createActionsWithSetState(todoList.update, domain)
