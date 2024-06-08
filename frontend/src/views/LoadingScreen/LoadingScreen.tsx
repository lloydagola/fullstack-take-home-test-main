import React from "react";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledLoadingScreen = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
}));

export default function LoadingScreen(): JSX.Element {
  return (
    <StyledLoadingScreen component="main">
      <Typography variant="h3">Loading...</Typography>
    </StyledLoadingScreen>
  );
}
