import React from "react";
import { render, screen } from "@testing-library/react";
import AppLayout from "../AppLayout";

const elementText = "Testing AppLayout";

describe("testing component rendering", () => {
  test("test component rendering", () => {
    render(
      <AppLayout>
        <div>{elementText}</div>
      </AppLayout>
    );

    const appLayout = screen.getByRole("main");
    const childElement = screen.getByText(elementText);

    expect(appLayout).toBeInTheDocument();
    expect(appLayout).toContainElement(childElement);
  });
});
