import React from "react";
import {
  screen,
  render,
  prettyDOM,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { SEARCH_BOOKS_QUERY } from "queries/books";
import SearchBar from "../SearchBar";
import { TBook } from "types/types";
import { booksData } from "_mocks_/books";
import AppContextProvider from "contexts/AppContextProvider";

const title = "Curious Princess and the Enchanted Garden";

const mocks = [
  {
    request: {
      query: SEARCH_BOOKS_QUERY,
      variables: { title },
      error: { message: "Sum ting wong" },
    },
    result: {
      data: {
        books: [
          {
            title: title,
            author: "Reese Smith",
            coverPhotoURL: "assets/image2.webp",
            readingLevel: "H",
          },
          {
            title: "Enchanted",
            author: "Reese Smith",
            coverPhotoURL: "assets/image2.webp",
            readingLevel: "H",
          },
        ],
      },
    },
  },
];

describe("Test rendering of the search component", () => {
  beforeAll(() => {
    render(
      <AppContextProvider books={booksData}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SearchBar />
        </MockedProvider>
      </AppContextProvider>
    );
  });

  it("should display the search bar", () => {
    const searchBar = screen.getByLabelText("search");

    expect(searchBar).toBeInTheDocument();
  });
});
/*
describe("Test search functionality", () => {
  beforeEach(() => {
    render(
      <AppContextProvider books={booksData}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SearchBar />
        </MockedProvider>
      </AppContextProvider>
    );
  });

  it("should display search results components", async () => {
    const candidate = screen.getByLabelText("search");
    await userEvent.click(candidate);
    await userEvent.type(candidate, title);

    // Assert that the search results are displayed
    const searchBar = screen.getByLabelText("search-results");
    expect(searchBar).toBeInTheDocument();
  });
});
*/
