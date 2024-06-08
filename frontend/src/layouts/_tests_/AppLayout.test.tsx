import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import router from "../../router/routes";

describe("testing component rendering", () => {
  test("test that the main component is rendered in the DOM", () => {
    render(<RouterProvider router={router} />);
    const appLayout = screen.queryByTestId("app-layout") as HTMLElement;
    expect(appLayout).toBeInTheDocument();
  });
});
