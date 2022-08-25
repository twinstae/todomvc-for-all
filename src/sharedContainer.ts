import { createContainer } from "./dependency";
import { localStorageWithSubscribe, withSubscribe } from "./Storage";

const storage = window.process?.env?.VITEST
  ? withSubscribe(new Map())
  : localStorageWithSubscribe;

export const { provide, inject } = createContainer({
  storage: storage,
});
