import { createContainer } from "../../dependency";
import type { TodoT } from "../../global";
import type { TodoActions } from "../../domain";
import { ref } from "vue";

export const { provide, inject } = createContainer({
  useTodoList: () => ref([] as readonly TodoT[] ),
  useActions: () => ({ }) as TodoActions,
});
