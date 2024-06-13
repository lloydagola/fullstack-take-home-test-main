import React from "react";
import { render, screen } from "@testing-library/react";
import BookListError from "../BookListError";

const errorText = "Something went wrong when attempting to fetch the Books.";

describe("Test Error Boundary", () => {
  let ChildComponent: () => JSX.Element, errorSpy: jest.SpyInstance;
  beforeEach(() => {
    // Suppress console error for this test
    errorSpy = jest.spyOn(console, "error");
    errorSpy.mockImplementation(() => {});

    ChildComponent = (): JSX.Element => {
      throw new Error(errorText);
    };
  });

  afterEach(() => {
    // Restore console error after each test
    errorSpy.mockRestore();
  });

  test("renders error message when child component throws", () => {
    render(
      <BookListError>
        <ChildComponent />
      </BookListError>
    );
    const errorMessage = screen.getByText(errorText);
    expect(errorMessage).toBeInTheDocument();
  });

  test("should throw error", () => {
    expect(() => render(<ChildComponent />)).toThrow(errorText);
  });
});
