import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "layouts/AppLayout";
import Home from "views/Home/Home";
import ReadingList from "views/ReadingList/ReadingList";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/books", element: <ReadingList /> },
    ],
  },
]);

export default router;
