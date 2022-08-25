import { createContainer } from "./dependency";
import { withSubscribe } from "./Storage";

export const { provide, inject } = createContainer({
  storage: withSubscribe(new Map()),
});
