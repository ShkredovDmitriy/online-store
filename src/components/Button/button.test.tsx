import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

const TestButton = () => (
  <Button
    type="testClassName"
    backColor="#B4E907"
    textColor="#000000"
    onClick={() => {
      const button = document.querySelector(".testClassName");
      if (button) button.textContent = "newTextForTest";
    }}
  >
    textForTest
  </Button>
);

test("Test button props children text", () => {
  render(<TestButton />);
  expect(screen.getByText("textForTest")).toBeInTheDocument();
});

test("Test button props className test", () => {
  const { container } = render(<TestButton />);
  expect(container.firstChild).toHaveClass("testClassName");
});

test("Test button props backColor and textColor", () => {
  const { container } = render(<TestButton />);
  expect(container.firstChild).toHaveStyle("background-color: #B4E907");
  expect(container.firstChild).toHaveStyle("color: #000000");
});

test("Test button click function", async () => {
  render(<TestButton />);
  const btn = await screen.findByText("textForTest");
  fireEvent.click(btn);
  const btnAfterClick = await screen.findByText("newTextForTest");
  expect(btnAfterClick).toBeInTheDocument();
});
