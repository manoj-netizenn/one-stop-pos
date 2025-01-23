import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Paper, Fade } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Logo from "./Logo";

function LoadingPage({ isComplete }) {
  const [loadingText, setLoadingText] = useState("Initiating payment");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const textInterval = setInterval(() => {
      if (!isComplete) {
        setLoadingText((text) => {
          switch (text) {
            case "Initiating payment":
              return "waiting for confirmation";
            case "waiting for confirmation":
              return "waiting for confirmation";
            case "Processing payment":
              return "waiting for confirmation";
            case "Almost there":
              return "Finalizing transaction";
            default:
              return "waiting for confirmation";
          }
        });
      }
    }, 3000);

    const dotsInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);

    return () => {
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, [isComplete]);

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "transparent",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Logo size="large" />
        </Box>
        <Fade in={true} timeout={800}>
          <Box>
            {isComplete ? (
              <CheckCircleIcon
                sx={{
                  fontSize: 60,
                  color: "success.main",
                  mb: 2,
                }}
              />
            ) : (
              <CircularProgress
                size={60}
                sx={{
                  mb: 2,
                  color: "primary.main",
                }}
              />
            )}
            <Typography variant="h5" gutterBottom>
              {isComplete ? "Payment Verified!" : loadingText + dots}
            </Typography>
            <Typography color="text.secondary">
              {isComplete
                ? "Preparing your receipt..."
                : "Please don't close this window"}
            </Typography>
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
}

export default LoadingPage;
