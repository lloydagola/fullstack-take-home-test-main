import React from "react";
import { render, screen } from "@testing-library/react";
import BookError from "../BookError";

const errorText = "Something went wrong when attempting to fetch the Book.";

describe("Test Error Boundary", () => {
  let ChildComponent: () => JSX.Element, consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    // Suppress console error for this test
    consoleSpy = jest.spyOn(console, "error");
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
      <BookError>
        <ChildComponent />
      </BookError>
    );
    const errorMessage = screen.getByText(errorText);
    expect(errorMessage).toBeInTheDocument();
  });

  test("should throw error", () => {
    expect(() => render(<ChildComponent />)).toThrow(errorText);
  });
});
