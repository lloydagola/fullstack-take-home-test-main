import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  {
    books {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;
export const SEARCH_BOOKS_QUERY = gql`
  query GetBookByTitle($title: String!) {
    books(title: $title) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

