import { createTheme } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#F76434",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
