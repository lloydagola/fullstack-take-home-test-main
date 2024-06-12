import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import Home from "views/Home/Home";
import ReadingList from "views/ReadingList/ReadingList";
import Error404Page from "views/404/Error404Page";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/books", element: <ReadingList /> },
      { path: "*", element: <Error404Page /> },
    ],
  },
]);

export default router;
