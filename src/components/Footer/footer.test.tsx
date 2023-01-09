import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Footer } from "./Footer";

const link1 = "https://rs.school/js/";
const link2 = "https://github.com/ShkredovDmitriy";
const link3 = "https://github.com/PolinaKuksova2022";

test("Test footer rs.school link href", () => {
  const { container } = render(<Footer />);
  const link = container.querySelector("a") as HTMLAnchorElement;
  if (link) expect(link.getAttribute("href")).toEqual(link1);
});

test("Test footer github link href", () => {
  const { container } = render(<Footer />);
  const link = container.querySelectorAll("a")[1] as HTMLAnchorElement;
  if (link) expect(link.getAttribute("href")).toEqual(link2);
});

test("Test footer github link href", () => {
  const { container } = render(<Footer />);
  const link = container.querySelectorAll("a")[2] as HTMLAnchorElement;
  if (link) expect(link.getAttribute("href")).toEqual(link3);
});
