import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import router from "../../router/routes";
import { booksData } from "_mocks_/books";
import AppContextProvider from "contexts/AppContextProvider";
import { MockedProvider } from "@apollo/client/testing";
import { SEARCH_BOOKS_QUERY } from "queries/books";

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

describe("testing component rendering", () => {
  test("test that the main component is rendered in the DOM", () => {
    render(
      <AppContextProvider books={booksData}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <RouterProvider router={router} />
        </MockedProvider>
      </AppContextProvider>
    );
    const appLayout = screen.queryByTestId("app-layout") as HTMLElement;
    expect(appLayout).toBeInTheDocument();
  });
});
