import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "16px",
  fontWeight: 600,
}));

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

const StyledFeaturedBook = styled(Box)(() => ({
  img: { transition: ".2s ease-in-out" },
  "&:hover": {
    img: { scale: "1.1", transition: ".2s ease-in-out" },
  },
}));

const StyledRecommendedBook = styled(Box)(() => ({
  img: { transition: ".2s ease-in-out" },
  "&:hover": {
    img: { scale: "1.1", transition: ".2s ease-in-out" },
  },
}));

function FeaturedBook({ featuredBook }: { featuredBook: TBook }): JSX.Element {
  const value = useContext(AppContext);
  const inReadingList = value?.readingList?.some(
    (_book: TBook) => _book.title === featuredBook?.title
  );
  return (
    <Grid
      item
      xl={6}
      m="16px 0"
      borderRadius={4}
      boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
    >
      <StyledFeaturedBook
        position="relative"
        sx={{
          img: { transition: ".2s ease-in-out" },
          overflow: "hidden",
          "&:hover": {
            img: { scale: "1.1", transition: ".2s ease-in-out" },
          },
        }}
      >
        <Box
          position="absolute"
          zIndex={2}
          height="100%"
          width="100%"
          sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          borderRadius={4}
        />
        <img
          loading="lazy"
          alt="featured book"
          width="100%"
          style={{ objectFit: "cover" }}
          src={featuredBook?.coverPhotoURL}
        />
        <Box
          color="white"
          position="absolute"
          zIndex={5}
          bottom={0}
          sx={{
            padding: { xs: "12px", lg: "24px" },
            img: { transition: ".2s ease-in-out" },
            "&:hover": {
              img: { scale: "1.1", transition: ".2s ease-in-out" },
            },
          }}
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
            <StyledButton
              variant="contained"
              color="error"
              onClick={() => value?.removeFromReadingList(featuredBook)}
            >
              Remove From List
            </StyledButton>
          ) : (
            <StyledButton
              variant="contained"
              onClick={() => value?.addToReadingList(featuredBook)}
            >
              Add to List
            </StyledButton>
          )}
        </Box>
      </StyledFeaturedBook>
    </Grid>
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
    <StyledRecommendedBook
      position="relative"
      borderRadius={4}
      overflow="hidden"
      sx={{}}
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
              <StyledButton
                variant="contained"
                color="error"
                onClick={() => value?.removeFromReadingList(featuredBook)}
              >
                Remove From List
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                onClick={() => value?.addToReadingList(featuredBook)}
              >
                Add to List
              </StyledButton>
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
    </StyledRecommendedBook>
  );
}
const StyledRecommendedBooks = styled(Grid)(({ theme }) => ({
  gridTemplateColumns: "1fr",
  "@media (min-width:480px)": {
    gridTemplateColumns: "repeat(2, minmax(300px, 1fr))",
  },
}));
export default function HeroSection(): JSX.Element {
  const value = useContext(AppContext);
  const featuredBook = value?.books?.[0];
  return (
    <>
      {featuredBook && <FeaturedBook featuredBook={featuredBook} />}

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
