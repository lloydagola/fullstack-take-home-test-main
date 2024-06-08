import React from "react";
import { RouterProvider } from "react-router-dom";
import { useQuery } from "@apollo/client";
import router from "./router/routes";
import LoadingScreen from "views/LoadingScreen/LoadingScreen";
import { BOOKS_QUERY } from "queries/books";

export default function App() {
  const { data, loading, error } = useQuery(BOOKS_QUERY);

  if (loading) return <LoadingScreen />;
  if (error) return <pre>{error.message}</pre>;

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
