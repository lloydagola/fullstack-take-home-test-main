import React, {
  ChangeEvent,
  memo,
  useDeferredValue,
  useRef,
  useState,
} from "react";
import { useQuery } from "@apollo/client";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { TBook } from "types/types";
import useDebounce from "hooks/useDebounce";
import { SEARCH_BOOKS_QUERY } from "queries/books";
import { useClickOutside } from "hooks/useClickOutside";
import SearchBarResults from "components/SearchBarResults/SearchBarResults";

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
      width: "100%",
    },
  },
}));

const MemoizedSearchBarResults = memo(SearchBarResults);

export default function SearchBar(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState<TBook[]>([]);
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isStale = searchTerm !== deferredSearchTerm;

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
    1000
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
        placeholder="Type to start searching"
        fullWidth
        type="search"
        value={searchTerm}
        inputProps={{ "aria-label": "search" }}
        onChange={handleSearch}
        onClick={() => setIsOpen(true)}
      />
      <MemoizedSearchBarResults
        data={data?.books}
        isOpen={isOpen}
        searchTerm={searchTerm}
        filteredBooks={filteredBooks}
        isStale={isStale}
        loading={loading}
        error={error}
      />
    </Search>
  );
}
