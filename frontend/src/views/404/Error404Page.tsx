import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

export default function Error404Page(): JSX.Element {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
    >
      <Typography variant="h4" textAlign="center" m={4}>
        Oops...An Error occurred and we could not direct you to the page you
        requested...
      </Typography>
      <Link to={"/"}>Take me back to the Home Page</Link>
    </Box>
  );
}
