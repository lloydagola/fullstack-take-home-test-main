import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { useQuery } from "@apollo/client";
import router from "./router/routes";
import LoadingScreen from "views/LoadingScreen/LoadingScreen";
import { BOOKS_QUERY } from "queries/books";
import AppContextProvider from "./contexts/AppContextProvider";
import { TBook } from "types/types";

export default function App(): JSX.Element {
  const { data, loading, error } = useQuery(BOOKS_QUERY);
  const [BookData, setBookData] = useState<TBook[]>([]);

  useEffect(() => {
    setBookData(data?.books);
  }, [data]);

  if (loading) return <LoadingScreen />;
  if (error) return <pre>{error.message}</pre>;

  return (
    <React.StrictMode>
      <AppContextProvider books={BookData}>
      <AppContextProvider books={BookData}>
        <RouterProvider router={router} />
      </AppContextProvider>
    </React.StrictMode>
  );
}
