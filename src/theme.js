import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6B46C1",
      light: "#9F7AEA",
      dark: "#553C9A",
    },
    secondary: {
      main: "#4299E1",
    },
    success: {
      main: "#48BB78",
      light: "#9AE6B4",
    },
    background: {
      default: "#F7FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2D3748",
      secondary: "#718096",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(107, 70, 193, 0.04)",
          },
        },
      },
    },
  },
});

export default theme;
