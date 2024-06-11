import React from "react";
import { screen, render } from "@testing-library/react";
import Button from "@mui/material/Button";
import Book from "../Book";
import { TBook } from "types/types";

describe("Test rendering of book component", () => {
  let book: TBook, inReadingList: boolean;
  const mockRemoveFromReadingList = jest.fn(),
    mockAddToReadingList = jest.fn();

  beforeEach(() => {
    book = {
      title: "Curious Princess and the Enchanted Garden",
      author: "Reese Smith",
      readingLevel: "H",
      coverPhotoURL: "assets/image2.webp",
    };
    inReadingList = false;

    render(
      <Book
        book={book}
        Button={
          inReadingList ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => mockRemoveFromReadingList(book)}
            >
              Remove From List
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => mockAddToReadingList(book)}
            >
              Add to List
            </Button>
          )
        }
      />
    );
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
