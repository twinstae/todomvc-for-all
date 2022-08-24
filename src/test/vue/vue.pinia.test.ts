import { storeToRefs } from "pinia";
import { createTestingPinia } from "@pinia/testing"
import { usePiniaTodoList } from "../../frameworks/vue/usePiniaTodoList";
import { runVueImpl } from "./runVueImpl";

runVueImpl(
  "pinia",
  () => {
    const store = usePiniaTodoList();
    const { todoList } = storeToRefs(store);
    return todoList;
  },
  usePiniaTodoList,
  undefined,
  (init) => {
    const pinia = createTestingPinia({
      initialState: {
        todoList: {
          todoList: init
        },
      },
      stubActions: false
    });

    return {
      global: {
        plugins: [pinia]
      }
    }
  }
);
