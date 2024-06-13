import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home";
import { SEARCH_BOOKS_QUERY } from "queries/books";
import AppContextProvider from "contexts/AppContextProvider";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const title = "Curious Princess and the Enchanted Garden";

const mocks = [
  {
    request: {
      query: SEARCH_BOOKS_QUERY,
      variables: { title },
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

describe("testing component rendering...", () => {
  let label = "book-list";
  let books: HTMLElement;
  beforeEach(() => {
    render(
      <AppContextProvider books={mocks[0].result.data.books}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </AppContextProvider>
    );
  });
  it("should display a list of books...", () => {
    const books = screen.getAllByText(title);
    expect(books).toHaveLength(2);
  });
});

describe("testing component functions...", () => {
  let label = "Add to List";
  beforeEach(() => {
    render(
      <AppContextProvider books={mocks[0].result.data.books}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </AppContextProvider>
    );
  });

  it("should display the books container...", async () => {
    const buttons = screen.findAllByText(label);
    expect(await buttons).toHaveLength(4);
  });

  it("should allow clicking the Add To List button", async () => {
    const buttons = await screen.findAllByText(label);

    fireEvent.click(buttons[0]);

    const removeButton = screen.getAllByText("Remove From List");
    expect(removeButton).toBeDefined();
  });
});
