import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Book from "components/Book/Book";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";
import BookListErrorBoundary from "errorBoundaries/BookListError/BookListError";

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: "600",
  [theme.breakpoints.up("lg")]: {
    fontSize: "2.4rem",
  },
}));

const StyledAuthor = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.6rem",
  },
}));

const StyledReadingLevel = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.2rem",
  },
}));

function FeaturedBook({ featuredBook }: { featuredBook: TBook }): JSX.Element {
  const value = useContext(AppContext);
  const inReadingList = value?.readingList?.some(
    (_book: TBook) => _book.title === featuredBook?.title
  );
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
      <Box
        color="white"
        position="absolute"
        zIndex={5}
        bottom={0}
        sx={{ padding: { xs: "12px", lg: "24px" } }}
      >
        <StyledTitle>{featuredBook?.title}</StyledTitle>
        <StyledAuthor>{featuredBook?.author}</StyledAuthor>
        <StyledReadingLevel>
          Reading Level:
          <Box component="span" fontWeight={600}>
            {featuredBook?.readingLevel}
          </Box>
        </StyledReadingLevel>
        {inReadingList ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => value?.removeFromReadingList(featuredBook)}
          >
            Remove From List
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => value?.addToReadingList(featuredBook)}
          >
            Add to List
          </Button>
        )}
      </Box>
    </>
  );
}

function RecommendedBook({
  featuredBook,
}: {
  featuredBook: TBook;
}): JSX.Element {
  const value = useContext(AppContext);
  const inReadingList = value?.readingList?.some(
    (_book: TBook) => _book.title === featuredBook?.title
  );
  return (
    <Box
      position="relative"
      borderRadius={4}
      boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
    >
      {!featuredBook ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Box
            position="absolute"
            zIndex={2}
            height="100%"
            width="100%"
            sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            borderRadius={2}
          />
          <Box
            color="white"
            position="absolute"
            zIndex={5}
            bottom={0}
            sx={{ padding: { xs: "12px", lg: "24px" } }}
          >
            <Typography fontSize="1.6rem" fontWeight={600}>
              {featuredBook?.title}
            </Typography>
            <Typography fontSize="1.2rem" fontWeight={600}>
              {featuredBook?.author}
            </Typography>
            <Typography fontSize="1.2rem" fontWeight={600}>
              Reading Level:
              <Box component="span" fontWeight={600}>
                {featuredBook?.readingLevel}
              </Box>
            </Typography>
            {inReadingList ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => value?.removeFromReadingList(featuredBook)}
              >
                Remove From List
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => value?.addToReadingList(featuredBook)}
              >
                Add to List
              </Button>
            )}
          </Box>
          <img
            loading="lazy"
            alt="featured book"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            src={featuredBook.coverPhotoURL}
          />
        </>
      )}
    </Box>
  );
}

const StyledRecommendedBooks = styled(Grid)(({ theme }) => ({
  gridTemplateColumns: "1fr",
  "@media (min-width:480px)": {
    gridTemplateColumns: "repeat(2, minmax(300px, 1fr))",
  },
}));

function HeroSection(): JSX.Element {
  const value = useContext(AppContext);
  const featuredBook = value?.books?.[0];
  return (
    <>
      <Grid
        item
        xl={6}
        m="16px 0"
        borderRadius={4}
        boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
      >
        <Box position="relative">
          {featuredBook && <FeaturedBook featuredBook={featuredBook} />}
          <img
            loading="lazy"
            alt="featured book"
            width="100%"
            style={{ objectFit: "cover" }}
            src={featuredBook?.coverPhotoURL}
          />
        </Box>
      </Grid>
      <StyledRecommendedBooks
        item
        xs={12}
        xl={6}
        display="grid"
        gap={1}
        p="16px"
        justifyContent="center"
      >
        {value?.books?.slice(1, 5).map((featuredBook: TBook, index: number) => (
          <RecommendedBook featuredBook={featuredBook} key={index} />
        ))}
      </StyledRecommendedBooks>
    </>
  );
}

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
