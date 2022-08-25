import { it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
// eslint-disable-next-line import/no-unresolved
import counterAlpine from "../../frameworks/alpine/alpine-counter.html?raw";
import { render } from "./render";

it("counter를 클릭하면 증가한다", async () => {
  render(counterAlpine);

  const counter = screen.getByLabelText('counter: 0');
  expect(counter).toHaveTextContent('0');

  const input = screen.getByRole("button", {
    name: 'Increment',
  });
  await userEvent.click(input);

  expect(counter).toHaveTextContent('1');
});