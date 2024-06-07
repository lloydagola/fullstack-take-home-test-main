import React from "react";
import { render, screen } from "@testing-library/react";
import AppLayout from "../AppLayout";

const elementText = "Testing AppLayout";

describe("testing component rendering", () => {
  let appLayout: HTMLElement, childElement: HTMLElement;
  beforeAll(() => {
    render(
      <AppLayout>
        <div>{elementText}</div>
      </AppLayout>
    );
    appLayout = screen.getByRole("main");
    childElement = screen.getByText(elementText);
  });
  test("test that component is rendered in the DOM", () => {
    expect(appLayout).toBeInTheDocument();
  });
  test("test that component renders children", () => {
    expect(appLayout).toContainElement(childElement);
  });
});
