import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom
import AppLayout from "../AppLayout";

describe("testing component rendering", () => {
  test("test component rendering", () => {
    render(
      <AppLayout>
        <div>Testing AppLayout</div>
      </AppLayout>
    );

    let appLayout = screen.getByText("Testing AppLayout");

    expect(appLayout).toBeInTheDocument();
  });
});
