import React from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(18, 47, 70, 1)",
    },
    secondary: {
      main: "rgba(70, 41, 18, 1)",
    },
    text: {
      primary: "rgba(29, 27, 32, 1)",
      secondary: "rgba(73, 69, 79, 1)",
    },
  },
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    h6: {
      fontSize: "1.25rem",
      fontWeight: 400,
      letterSpacing: "0.5px",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.5px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body1,
        }),
        head: ({ theme }) => ({
          ...theme.typography.h6,
        }),
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({
          ...theme.typography.h6,
        }),
        secondary: ({ theme }) => ({
          ...theme.typography.body1,
        }),
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};