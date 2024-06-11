import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Book from "components/Book/Book";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";

export default function ReadingList(): JSX.Element {
  const value = useContext(AppContext);
  return (
    <Grid
      container
      gap={2}
      display="grid"
      justifyContent="center"
      gridTemplateColumns="repeat(auto-fill, 300px)"
    >
      {value?.readingList.map((book: TBook, index: number) => (
        <Book
          book={book}
          key={index}
          Button={
            <Button
              variant="contained"
              color="error"
              onClick={() => value.removeFromReadingList(book)}
            >
              Remove From List
            </Button>
          }
        />
      ))}
    </Grid>
  );
}
