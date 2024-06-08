import React from "react";
import Grid from "@mui/material/Grid";
import Book from "components/Book/Book";

export default function Books(): JSX.Element {
  return (
    <Grid
      container
      gap={2}
      display="grid"
      justifyContent="center"
      gridTemplateColumns="repeat(auto-fill, 300px)"
    >
      <Book
        title="Curious Princess and the Enchanted Garden"
        author="Reese Smith"
        readingLevel="H"
        thumbnailUrl="assets/image2.webp"
        data-testid="card"
      />
      <Book
        title="Clever Monster on the Wonder Island"
        author="Jordan Jones"
        readingLevel="I"
        thumbnailUrl="assets/image10.webp"
        data-testid="card"
      />
      <Book
        title="Happy Knight and the Magic Spell"
        author="Quinn Brown"
        readingLevel="I"
        thumbnailUrl="assets/image10.webp"
        data-testid="card"
      />
      <Book
        title="Happy Dragon and the Magic Spell"
        author="Alex Jones"
        readingLevel="A"
        thumbnailUrl="assets/image6.webp"
        data-testid="card"
      />
    </Grid>
  );
}
