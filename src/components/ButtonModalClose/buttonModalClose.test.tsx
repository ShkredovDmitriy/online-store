import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonModalClose } from "./ButtonModalClose";

const TestButton = () => (
  <ButtonModalClose
    onClick={() => {
      const button = document.querySelector(".button-modal-close");
      if (button) button.textContent = "newTextForTest";
    }}
  />
);

test("Test button click function", async () => {
  render(<TestButton />);
  const btn = document.querySelector(".button-modal-close");
  if (btn) fireEvent.click(btn);
  const btnAfterClick = await screen.findByText("newTextForTest");
  expect(btnAfterClick).toBeInTheDocument();
});
