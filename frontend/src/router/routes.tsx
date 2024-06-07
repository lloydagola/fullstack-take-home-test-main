import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../views/Home/Home";
import Books from "../views/Books/Books";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/books", element: <Books /> },
    ],
  },
]);

export default router;
