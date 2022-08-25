import { createContainer } from "../../src/dependency";
import type { TodoT } from "../../src/global";
import type { TodoActions } from "../../src/domain";
import { ref } from "vue";

export const { provide, inject } = createContainer({
  useTodoList: () => ref([] as readonly TodoT[] ),
  useActions: () => ({ }) as TodoActions,
});
