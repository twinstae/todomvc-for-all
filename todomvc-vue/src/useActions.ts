import { TodoActions } from "@todomvc-core/domain";
import createDependency from "./createDependency";

export const [
  useActionsKey,
  useActions,
  provideUseActions,
] = createDependency<TodoActions>('useActions')