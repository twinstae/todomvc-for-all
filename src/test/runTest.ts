import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { TodoT } from "../frameworks/react/TodoMvcReact";
import strs from "../strs";

interface TodoMVCImpl {
  framework: string;
  render: (init: TodoT[]) => void;
}

export default function runTest({ framework, render }: TodoMVCImpl) {
  describe(`TodoMVC ${framework}`, () => {
    it("새로운 할 일을 추가할 수 있다", async () => {
      render([]);

      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

      const input = screen.getByRole("textbox", {
        name: strs.addTodoLabel,
      });
      await userEvent.type(input, "todolist 테스트하기{enter}");

      expect(screen.getByRole("listitem")).toHaveTextContent(
        /todolist 테스트하기/
      );
    });

    it("할 일을 완료할 수 있다", async () => {
      render([{ id: 0, content: "테스트하기", isCompleted: false }]);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("할 일을 삭제할 수 있다", async () => {
      render([{ id: 1, content: "삭제할 일", isCompleted: false }]);

      const button = screen.getByRole("button", {
        name: "삭제하기 삭제할 일"
      });

      await userEvent.click(button);

      expect(button).not.toBeInTheDocument();
    });
  });
}
