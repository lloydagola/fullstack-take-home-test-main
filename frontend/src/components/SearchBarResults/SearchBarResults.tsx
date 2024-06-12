import React, { Suspense, useContext } from "react";
import { ApolloError } from "@apollo/client";
import Box from "@mui/material/Box";
import { TBook } from "types/types";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { AppContext } from "contexts/AppContextProvider";
import BookErrorBoundary from "errorBoundaries/BookError/BookError";

export default function SearchBarResults({
  data,
  isOpen,
  searchTerm,
  filteredBooks,
  isStale,
  loading,
  error,
}: {
  data: TBook[];
  isOpen: boolean;
  searchTerm: string;
  filteredBooks: TBook[];
  isStale: boolean;
  loading: boolean;
  error: ApolloError | undefined;
}): JSX.Element {
  const appData = useContext(AppContext);

  return (
    <BookErrorBoundary>
      <Suspense fallback={<Typography>Searching...</Typography>}>
        <Box
          position="absolute"
          flexDirection="column"
          aria-label="search-results"
          display={`${
            isOpen && searchTerm.trim() && filteredBooks.length > 0
              ? "flex"
              : "none"
          }`}
          p={1}
          overflow="scroll"
          height="600px"
          width="100%"
          boxShadow="0px 2px 2px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
          sx={{ backgroundColor: "#fff" }}
        >
          {error ? (
            <Box>
              <Typography>an error ocurred, {String(error)}</Typography>
            </Box>
          ) : (
            searchTerm.trim() &&
            !loading &&
            data &&
            filteredBooks.map((book: TBook, index: number): JSX.Element => {
              const inReadingList = appData?.readingList?.some(
                (_book: TBook) => _book.title === book.title
              );
              return (
                <Box
                  p={1}
                  borderBottom="1px solid #999"
                  key={index}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  sx={isStale || loading ? { opacity: 0.5 } : { opacity: 1 }}
                >
                  <img
                    loading="lazy"
                    src={book.coverPhotoURL}
                    width="60px"
                    style={{ margin: "12px" }}
                  />
                  <Box display="flex" flex="1" flexDirection="column">
                    <Typography>{book.title}</Typography>
                    {inReadingList ? (
                      <Button
                        color="error"
                        sx={{
                          margin: "4px 0",
                          borderRadius: "16px",
                          fontWeight: 600,
                          width: "180px",
                        }}
                        variant="contained"
                        onClick={() => appData?.removeFromReadingList(book)}
                      >
                        Remove From List
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          margin: "4px 0",
                          borderRadius: "16px",
                          fontWeight: 600,
                          width: "130px",
                        }}
                        variant="contained"
                        onClick={() => appData?.addToReadingList(book)}
                      >
                        Add to List
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Suspense>
    </BookErrorBoundary>
  );
}
