import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

function Home(): JSX.Element {
  return <div>home</div>;
}

function Books(): JSX.Element {
  return <div>books</div>;
}

function ErrorPage(): JSX.Element {
  return <>Error Page</>;
}

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
