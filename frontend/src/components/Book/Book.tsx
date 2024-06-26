import React, { ReactNode, memo } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TBook } from "types/types";
import BookErrorBoundary from "errorBoundaries/BookError/BookError";

const StyledBookContainer = styled(Box)(({ theme }) => ({
  padding: "12px",
  boxShadow:
    "0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  img: {
    width: "100%",
    transition: ".2s ease-in-out",
  },
  h4: {
    fontSize: "1.2rem",
    fontWeight: 600,
    paddingBottom: "8px",
  },
  p: {
    paddingBottom: "8px",
  },
  button: {
    borderRadius: "16px",
    fontWeight: 600,
    color: theme.palette.background.default,
  },
  span: {
    fontWeight: 600,
  },

  "&:hover": {
    img: { scale: "1.1", transition: ".2s ease-in-out" },
  },
}));

type TBookProps = {
  book: TBook;
  Button: ReactNode;
};

function Book({ book, Button }: TBookProps): JSX.Element {
  const { title, author, readingLevel, coverPhotoURL } = book;

  return (
    <BookErrorBoundary>
      <StyledBookContainer>
        <Box width={276} height={276} overflow="hidden">
          <img loading="lazy" src={coverPhotoURL} alt="book cover image" />
        </Box>
        <Box p={1}>
          <Typography variant="h4">{title}</Typography>
          <Typography>{author}</Typography>
          <Typography>
            <span>Reading Level:</span>
            {readingLevel}
          </Typography>
          {Button}
        </Box>
      </StyledBookContainer>
    </BookErrorBoundary>
  );
}

export default memo(Book);
