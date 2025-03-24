"use client";
import { createTheme } from "@mui/material/styles";
import tailwindColors from "tailwindcss/colors";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: tailwindColors.purple[600],
    },
  },
});

export default theme;
