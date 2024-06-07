import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("testing component rendering", () => {
  let appLayout: HTMLElement;
  beforeEach(() => {
    appLayout = screen.getByRole("main");
  });

  test("test component rendering", () => {
    render(<App />);

    expect(appLayout).toBeInTheDocument();
  });
});
