import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { AppContext } from "contexts/AppContextProvider";
import { TBook } from "types/types";
import useDebounce from "hooks/useDebounce";
import { SEARCH_BOOKS_QUERY } from "queries/books";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useClickOutside } from "../../hooks/useClickOutside";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: "1px solid #999",
  width: "260px",
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchBar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<TBook[]>([]);
  const appData = useContext(AppContext);
  const { loading, error, data } = useQuery(SEARCH_BOOKS_QUERY, {
    variables: { title: searchTerm },
  });

  const listRef = useRef(null);
  useClickOutside(listRef, (): void => {
    setIsOpen(false);
  });

  // DeBounce Function
  useDebounce(
    (): void => {
      if (!data || !data.books) setFilteredBooks([]);
      setFilteredBooks((currentState: TBook[]) => {
        if (!data || !data.books) return [];

        return data?.books?.filter((book: TBook) =>
          book.title
            .trim()
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
        );
      });
    },
    [data, searchTerm],
    800
  );

  function handleSearch({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(value);
  }

  return (
    <Search ref={listRef}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        type="search"
        value={searchTerm}
        inputProps={{ "aria-label": "search" }}
        onChange={handleSearch}
        onClick={() => setIsOpen(true)}
      />
      <Box
        position="absolute"
        flexDirection="column"
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
        {loading ? (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Loading...</Typography>
          </Box>
        ) : error ? (
          <Typography>an error ocurred</Typography>
        ) : (
          searchTerm.trim() &&
          filteredBooks.map((book, index): JSX.Element => {
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
    </Search>
  );
}
