import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Book from "components/Book/Book";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";
import Button from "@mui/material/Button";
import BookListErrorBoundary from "errorBoundaries/BookListError/BookListError";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

function Tint({
  featuredBook,
  titleFontSize,
  authorFontSize,
  readingLevelFontSize,
}: {
  featuredBook: TBook | undefined;
  titleFontSize: number;
  authorFontSize: number;
  readingLevelFontSize: number;
}): JSX.Element {
  return (
    <>
      <Box
        position="absolute"
        zIndex={2}
        height="100%"
        width="100%"
        sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        borderRadius={2}
      />
      <Box color="white" position="absolute" zIndex={5} bottom={0} p={4}>
        <Typography variant="h3" fontSize={titleFontSize}>
          {featuredBook?.title}
        </Typography>
        <Typography fontSize={authorFontSize} fontWeight={600}>
          {featuredBook?.author}
        </Typography>
        <Typography fontSize={readingLevelFontSize}>
          Reading Level:
          <Box component="span" fontWeight={600}>
            {featuredBook?.readingLevel}
          </Box>
        </Typography>
        <Button
          sx={{ margin: "4px" }}
          variant="contained"
          onClick={() => console.log("handle click...")}
        >
          Add to List
        </Button>
      </Box>
    </>
  );
}

const StyledRecommendedBooks = styled(Grid)(({ theme }) => ({
  gridTemplateColumns: "1fr",
  "@media (min-width:480px)": {
    gridTemplateColumns: "repeat(2, minmax(300px, 1fr))",
  },
}));

export default function Books(): JSX.Element {
  const value = useContext(AppContext);
  const featuredBook = value?.books?.[0];

  return (
    <BookListErrorBoundary>
      <Grid container maxWidth={1920} m="auto" justifyContent="center">
        <Grid
          item
          xl={6}
          p={2}
          borderRadius={4}
          boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
        >
          <Box position="relative">
            {featuredBook && (
              <Tint
                featuredBook={featuredBook}
                titleFontSize={48}
                authorFontSize={24}
                readingLevelFontSize={24}
              />
            )}
            <img
              loading="lazy"
              alt="featured book"
              width="100%"
              src={value?.books?.[0]?.coverPhotoURL}
            />
          </Box>
        </Grid>
        <StyledRecommendedBooks
          item
          xs={12}
          xl={6}
          display="grid"
          gap={1}
          p="0 16px"
          justifyContent="center"
        >
          <Box
            position="relative"
            borderRadius={4}
            boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
          >
            <Tint
              featuredBook={featuredBook}
              titleFontSize={24}
              authorFontSize={16}
              readingLevelFontSize={16}
            />
            <img
              loading="lazy"
              alt="featured book"
              width="100%"
              height="100%"
              src={value?.books?.[1]?.coverPhotoURL}
            />
          </Box>
          <Box
            position="relative"
            borderRadius={4}
            boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
          >
            <Tint
              featuredBook={featuredBook}
              titleFontSize={24}
              authorFontSize={16}
              readingLevelFontSize={16}
            />
            <img
              loading="lazy"
              alt="featured book"
              width="100%"
              height="100%"
              src={value?.books?.[5]?.coverPhotoURL}
            />
          </Box>
          <Box
            position="relative"
            borderRadius={4}
            boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
          >
            <Tint
              featuredBook={featuredBook}
              titleFontSize={24}
              authorFontSize={16}
              readingLevelFontSize={16}
            />
            <img
              loading="lazy"
              alt="featured book"
              width="100%"
              height="100%"
              src={value?.books?.[3]?.coverPhotoURL}
            />
          </Box>
          <Box
            position="relative"
            borderRadius={4}
            boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
          >
            <Tint
              featuredBook={featuredBook}
              titleFontSize={24}
              authorFontSize={16}
              readingLevelFontSize={16}
            />
            <img
              loading="lazy"
              alt="featured book"
              width="100%"
              height="100%"
              src={value?.books?.[7]?.coverPhotoURL}
            />
          </Box>
        </StyledRecommendedBooks>
        <Grid
          container
          gap={2}
          aria-label="book-list"
          display="grid"
          justifyContent="center"
          gridTemplateColumns={"repeat(auto-fill, 300px)"}
        >
          {value?.books?.map((book: TBook, index: number): JSX.Element => {
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
      </Grid>
    </BookListErrorBoundary>
  );
}
