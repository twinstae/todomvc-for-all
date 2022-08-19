import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import strs from "../strs";

interface TodoMVCImpl {
  framework: string;
  render: () => void;
}

export default function runTest({ framework, render }: TodoMVCImpl) {
  describe(`TodoMVC ${framework}`, () => {
    it("새로운 할 일을 추가할 수 있다", async () => {
      render();

      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

      const input = screen.getByRole("textbox", {
        name: strs.addTodoLabel,
      });
      await userEvent.type(input, "todolist 테스트하기{enter}");

      expect(screen.getByRole("listitem")).toHaveTextContent(/todolist 테스트하기/);
    });
  });
}
