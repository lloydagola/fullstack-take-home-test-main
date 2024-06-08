import React from "react";
import { screen, render } from "@testing-library/react";
import Book from "../Book";

describe("Test rendering of book component", () => {
  let title: string, author: string, readingLevel: string, thumbnailUrl: string;

  beforeEach(() => {
    title = "Curious Princess and the Enchanted Garden";
    author = "Reese Smith";
    readingLevel = "H";
    thumbnailUrl = "assets/image2.webp";

    render(
      <Book
        title={title}
        author={author}
        readingLevel={readingLevel}
        thumbnailUrl={thumbnailUrl}
        data-testid="card"
      />
    );
  });

  it("should display the book cover image", () => {
    const coverImage = screen.getByAltText("book cover image");

    expect(coverImage).toBeInTheDocument();
  });

  it("should display the book title", () => {
    const titleText = screen.getByText(title);

    expect(titleText).toBeInTheDocument();
  });

  it("should display the book author", () => {
    const authorText = screen.getByText(author);

    expect(authorText).toBeInTheDocument();
  });

  it("should display the book reading level", () => {
    const readingLevelText = screen.getByText(readingLevel);

    expect(readingLevelText).toBeInTheDocument();
  });
});
