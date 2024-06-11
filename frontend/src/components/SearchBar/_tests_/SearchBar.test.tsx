import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { SEARCH_BOOKS_QUERY } from "queries/books";
import { booksData } from "_mocks_/books";
import AppContextProvider from "contexts/AppContextProvider";
import { RouterProvider } from "react-router-dom";
import router from "router/routes";

const title = "Curious Princess and the Enchanted Garden";

const mocks = [
  {
    request: {
      query: SEARCH_BOOKS_QUERY,
      variables: { title: "" },
    },
    result: {
      data: {
        books: [
          {
            title,
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
  beforeEach(() => {
    render(
      <AppContextProvider books={booksData}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <RouterProvider router={router} />
        </MockedProvider>
      </AppContextProvider>
    );
  });

  it("should display the search bar", () => {
    const searchBar = screen.getByLabelText("search");

    expect(searchBar).toBeInTheDocument();
  });

  it("test that the correct book is rendered", () => {
    const book = screen.getByText(title);
    expect(book).toBeInTheDocument();
  });
});
