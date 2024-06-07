import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import router from "../../router/routes";

const elementText = "Testing AppLayout";

describe("testing component rendering", () => {
  let appLayout: HTMLElement;
  beforeAll(() => {
    render(<RouterProvider router={router} />);

    appLayout = screen.getByTestId("app-layout");
  });
  test("test that the main component is rendered in the DOM", () => {
    expect(appLayout).toBeInTheDocument();
  });
});
