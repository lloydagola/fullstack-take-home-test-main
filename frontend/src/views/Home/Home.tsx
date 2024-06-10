import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Book from "components/Book/Book";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";
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
      {value?.books?.map((book: TBook, index: number): JSX.Element => {
        const inReadingList = value.readingList.includes(book);

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
  );
}
