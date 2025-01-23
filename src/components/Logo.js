/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

function Logo({ size = "medium", color = "primary", onClick }) {
  const sizes = {
    small: {
      icon: 20,
      text: "body1",
    },
    medium: {
      icon: 24,
      text: "h6",
    },
    large: {
      icon: 32,
      text: "h5",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick && {
          opacity: 0.8,
        },
      }}
      onClick={onClick}
    >
      <StoreIcon
        sx={{
          fontSize: sizes[size].icon,
          color: `${color}.main`,
        }}
      />
      <Typography
        variant={sizes[size].text}
        component="span"
        sx={{
          fontWeight: 700,
          color: `${color}.main`,
          letterSpacing: -0.5,
        }}
      >
        One Stop
      </Typography>
    </Box>
  );
}

export default Logo;
