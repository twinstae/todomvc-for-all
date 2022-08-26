import { storeToRefs } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { usePiniaTodoList } from "@/usePiniaTodoList";
import { runVueImpl } from "./runVueImpl";

runVueImpl(
  "pinia",
  () => storeToRefs(usePiniaTodoList()).todoList,
  usePiniaTodoList,
  undefined,
  (init) => ({
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            todoList: {
              todoList: init,
            },
          },
          stubActions: false,
        }),
      ],
    },
  })
);
