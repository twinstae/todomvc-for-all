import { TodoActions } from "../../src/domain";
import createDependency from "./createDependency";

export const [
  useActionsKey,
  useActions,
  provideUseActions,
] = createDependency<TodoActions>('useActions')