import React from "react";
import Grid from "@mui/material/Grid";
import Book from "components/Book/Book";
import { TBook } from "utils/types";
import { booksData } from "_mocks_/books";

export default function Books(): JSX.Element {
  return (
    <Grid
      container
      gap={2}
      display="grid"
      justifyContent="center"
      gridTemplateColumns="repeat(auto-fill, 300px)"
    >
      {booksData.map((book: TBook, index: number) => (
        <Book book={book} />
      ))}
    </Grid>
  );
}
