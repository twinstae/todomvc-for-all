import { createContainer } from "../../dependency";
import { withSubscribe } from "../Storage";
import type { TodoT } from "../../global";
import type { TodoActions } from "../domain";
import { ref } from "vue";

export const { provide, inject } = createContainer({
  storage: withSubscribe(new Map()),
  useTodoList: () => ref([] as readonly TodoT[] ),
  useActions: () => ({ }) as TodoActions,
});
