import React from "react";
import { render, screen } from "@testing-library/react";
import HomePageError from "../HomePageError";

const errorText =
  "Something went wrong when attempting to fetch the Home page.";

describe("Test Error Boundary", () => {
  let ChildComponent: () => JSX.Element, consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    // Suppress console error for this test
    consoleSpy = jest.spyOn(console, "warn");
    consoleSpy.mockImplementation(() => {});

    ChildComponent = (): JSX.Element => {
      throw new Error(errorText);
    };
  });

  afterEach(() => {
    // Restore console error after each test
    consoleSpy.mockRestore();
  });

  test("renders error message when child component throws", () => {
    render(
      <HomePageError>
        <ChildComponent />
      </HomePageError>
    );
    const errorMessage = screen.getByText(errorText);
    expect(errorMessage).toBeInTheDocument();
  });

  test("should throw error", () => {
    expect(() => render(<ChildComponent />)).toThrow(errorText);
  });
});

test("renders error message when child component throws", () => {
  const ChildComponent = (): JSX.Element => {
    throw new Error(errorText);
  };

  render(
    <HomePageError>
      <ChildComponent />
    </HomePageError>
  );

  const errorMessage = screen.getByText(errorText);
  expect(errorMessage).toBeInTheDocument();
});
