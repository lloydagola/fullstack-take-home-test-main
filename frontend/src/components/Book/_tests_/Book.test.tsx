import React from "react";
import { screen, render } from "@testing-library/react";
import Book from "../Book";
import { TBook } from "types/types";

describe("Test rendering of book component", () => {
  let book: TBook;

  beforeEach(() => {
    book = {
      title: "Curious Princess and the Enchanted Garden",
      author: "Reese Smith",
      readingLevel: "H",
      coverPhotoURL: "assets/image2.webp",
    };

    render(<Book book={book} />);
  });

  it("should display the book cover image", () => {
    const coverImage = screen.getByAltText("book cover image");

    expect(coverImage).toBeInTheDocument();
  });

  it("should display the book title", () => {
    const titleText = screen.getByText(book.title);

    expect(titleText).toBeInTheDocument();
  });

  it("should display the book author", () => {
    const authorText = screen.getByText(book.author);

    expect(authorText).toBeInTheDocument();
  });

  it("should display the book reading level", () => {
    const readingLevelText = screen.getByText(book.readingLevel);

    expect(readingLevelText).toBeInTheDocument();
  });
});
