import React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const StyledBookContainer = styled(Box)(({ theme }) => ({
  padding: "4px 12px 12px",
  boxShadow:
    "0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  img: {
    width: "100%",
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
  },
  span: {
    fontWeight: 600,
  },
}));

type TBookProps = {
  title: string;
  author: string;
  readingLevel: string;
  thumbnailUrl: string;
};

export default function Book({
  title,
  author,
  readingLevel,
  thumbnailUrl,
}: TBookProps): JSX.Element {
  return (
    <StyledBookContainer>
      <Box>
        <img loading="lazy" src={thumbnailUrl} alt="book cover image" />
      </Box>
      <Box p={1}>
        <Typography variant="h4">{title}</Typography>
        <Typography>{author}</Typography>
        <Typography>
          <span>Reading Level:</span>
          {readingLevel}
        </Typography>
        <Button variant="contained" fullWidth>
          Add To Reading List
        </Button>
      </Box>
    </StyledBookContainer>
  );
}
