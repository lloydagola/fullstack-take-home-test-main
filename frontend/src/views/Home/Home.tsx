import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Book from "components/Book/Book";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "utils/types";
import Button from "@mui/material/Button";

export default function Books(): JSX.Element {
  const value = useContext(AppContext);
  return (
    <Grid
      container
      gap={2}
      display="grid"
      justifyContent="center"
      gridTemplateColumns="repeat(auto-fill, 300px)"
    >
      {value?.books.map((book: TBook, index: number) => (
        <Book
          book={book}
          key={index}
          Button={
            <Button
              variant="contained"
              onClick={() => value.addToReadingList(book)}
            >
              Add to List
            </Button>
          }
        />
      ))}
    </Grid>
  );
}
