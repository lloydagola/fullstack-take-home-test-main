import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Book from "components/Book/Book";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Box";
import { Link } from "react-router-dom";

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
      {value?.readingList && value?.readingList.length > 0 ? (
        value.readingList?.map((book: TBook, index: number) => (
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
        ))
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100vh"
        >
          <Typography>You have no books in your reading list...</Typography>
          <Typography>
            <Link to="/">Click here </Link>
            to go to the home page and add some books to your list
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
