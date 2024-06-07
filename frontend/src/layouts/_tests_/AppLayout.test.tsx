import React from "react";
import { render, screen } from "@testing-library/react";
import AppLayout from "../AppLayout";

describe("testing component rendering", () => {
  test("test component rendering", () => {
    render(
      <AppLayout>
        <div>Testing AppLayout</div>
      </AppLayout>
    );

    let appLayout = screen.getByRole("main");

    expect(appLayout).toBeInTheDocument();
  });
});
