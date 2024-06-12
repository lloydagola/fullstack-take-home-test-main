import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { useQuery } from "@apollo/client";
import router from "./router/routes";
import { BOOKS_QUERY } from "queries/books";
import { TBook } from "types/types";
import AppContextProvider from "contexts/AppContextProvider";
import LoadingScreen from "views/LoadingScreen/LoadingScreen";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme/theme";

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
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AppContextProvider>
    </React.StrictMode>
  );
}
