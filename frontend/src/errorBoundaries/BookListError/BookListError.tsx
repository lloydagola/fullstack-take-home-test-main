/* eslint-disable quotes */
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default class BookListErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    //log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      //render any custom fallback UI
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          width={{ lg: `calc(100vw - 240px)` }}
        >
          <Typography fontSize="2rem">
            Something went wrong when attempting to fetch the Books.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}
