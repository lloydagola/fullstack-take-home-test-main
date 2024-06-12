import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Book from "components/Book/Book";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";
import BookListErrorBoundary from "errorBoundaries/BookListError/BookListError";
import HeroSection from "../../components/HeroSection/HeroSection";

export default function Books(): JSX.Element {
  const value = useContext(AppContext);

  return (
    <BookListErrorBoundary>
      <Grid container maxWidth={1920} m="32px auto" justifyContent="center">
        <HeroSection />
        <Grid
          container
          gap={2}
          aria-label="book-list"
          display="grid"
          justifyContent="center"
          gridTemplateColumns={"repeat(auto-fill, 300px)"}
        >
          {value?.books
            ?.slice(5)
            .map((book: TBook, index: number): JSX.Element => {
              const inReadingList = value?.readingList?.some(
                (_book: TBook) => _book.title === book.title
              );

              return (
                <Book
                  book={book}
                  key={index}
                  Button={
                    inReadingList ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => value.removeFromReadingList(book)}
                      >
                        Remove From List
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => value.addToReadingList(book)}
                      >
                        Add to List
                      </Button>
                    )
                  }
                />
              );
            })}
        </Grid>
        <HeroSection />
      </Grid>
    </BookListErrorBoundary>
  );
}
