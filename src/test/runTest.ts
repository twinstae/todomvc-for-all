import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import type { TodoT } from "../global";

interface TodoMVCImpl {
  framework: string;
  render: (init: TodoT[]) => Promise<void>;
}

export default function runTest({ framework, render }: TodoMVCImpl) {
  describe(`TodoMVC ${framework}`, () => {
    it("비어있지 않은 할 일을 추가할 수 있다", async () => {
      await render([]);

      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

      const input = screen.getByRole("textbox", {
        name: /새로운 할일/,
      });
      await userEvent.type(input, "{enter}테스트{enter}");

      expect(screen.getByRole("listitem")).toHaveTextContent("테스트");
    });

    it("할 일을 완료할 수 있다", async () => {
      await render([{ id: 0, content: "테스트하기", isCompleted: false }]);

      const checkbox = screen.getByRole("checkbox", {
        name: /완료/,
      });
      expect(checkbox).not.toBeChecked();

      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
      
      await userEvent.keyboard("odd{Enter}");

      await waitFor(() => expect(checkbox).not.toBeChecked());
    });

    it("할 일을 삭제할 수 있다", async () => {
      await render([{ id: 1, content: "테스트", isCompleted: false }]);

      const button = screen.getByRole("button", {
        name: /삭제/,
      });

      await userEvent.click(button);

      expect(button).not.toBeInTheDocument();
    });

    it("할 일을 수정할 수 있다", async () => {
      await render([{ id: 1, content: "테스트", isCompleted: false }]);

      await userEvent.click(screen.getByRole("button", { name: /수정/ }));

      await waitFor(() => {
        const editInput = screen.getByDisplayValue('테스트') as HTMLInputElement;
        expect(editInput).toHaveFocus();
      })
      
      await userEvent.keyboard(" 리애{Backspace}액트");
      await userEvent.click(screen.getByRole("button", { name: /수정/ }));

      await waitFor(() => {
        expect(screen.getByRole("listitem")).toHaveTextContent(/테스트 리액트/)
      });
    });

    it("수정 도중에 blur되면 수정을 취소한다.", async () => {
      await render([{ id: 1, content: "테스트하기", isCompleted: false }]);

      await userEvent.dblClick(screen.getByRole("listitem"));

      await userEvent.keyboard("{Backspace}수정된 테스트{Escape}");

      await waitFor(() => {
        expect(screen.getByRole("listitem")).toHaveTextContent(/테스트하기/)
      });
    });
  });
}
