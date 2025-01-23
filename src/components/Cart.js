/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Divider,
  Badge,
  Drawer,
  Fab,
  Stack,
  ButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "./Logo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Cart({
  items,
  quantities,
  onQuantityChange,
  onRemove,
  onCheckout,
  onLogoClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrement = (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    onQuantityChange(itemId, currentQuantity + 1);
  };

  const handleDecrement = (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    if (currentQuantity > 1) {
      onQuantityChange(itemId, currentQuantity - 1);
    }
  };

  const calculateItemTotal = (item) => {
    return item.price * (quantities[item.id] || 1);
  };

  const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const totalItems = items.reduce(
    (sum, item) => sum + (quantities[item.id] || 1),
    0
  );

  const handleDrawerClose = () => {
    setIsOpen(false);
    if (window.innerWidth < 600) {
      document.body.style.overflow = "auto";
    }
  };

  const handleDrawerToggle = () => {
    if (isOpen) {
      handleDrawerClose();
    } else {
      setIsOpen(true);
      if (window.innerWidth < 600) {
        document.body.style.overflow = "hidden";
      }
    }
  };

  // Update Logo click handler
  const handleLogoClickInCart = () => {
    handleDrawerClose();
    onLogoClick();
  };

  const cartContent = (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box onClick={handleLogoClickInCart} sx={{ cursor: "pointer" }}>
            <Logo size="medium" />
          </Box>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleLogoClickInCart}
          sx={{ mt: 2 }}
          fullWidth
        >
          Back to Services
        </Button>
      </Box>
      <Divider />
      {items.length === 0 ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Add some services to get started
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: "auto" }}>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Box sx={{ display: "flex", width: "100%", mb: 1 }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500 }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Duration: {item.duration}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onRemove(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <ButtonGroup size="small" variant="outlined">
                      <IconButton
                        onClick={() => handleDecrement(item.id)}
                        disabled={quantities[item.id] <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: "divider",
                        }}
                      >
                        {quantities[item.id] || 1}
                      </Box>
                      <IconButton onClick={() => handleIncrement(item.id)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </ButtonGroup>
                    <Typography variant="body2" color="primary">
                      ₹{calculateItemTotal(item).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                </ListItem>
                {index < items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ p: 2, bgcolor: "background.default" }}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">
                    ₹{total.toLocaleString("en-IN")}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    ₹{total.toLocaleString("en-IN")}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                onCheckout();
                setIsOpen(false);
              }}
              sx={{ mt: 2 }}
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </>
  );

  return (
    <>
      <Fab
        color="primary"
        aria-label="cart"
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: (theme) => theme.zIndex.drawer - 1,
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Badge
          badgeContent={totalItems}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              transition: "all 0.2s",
            },
          }}
        >
          <ShoppingCartIcon
            sx={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </Badge>
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          },
        }}
        ModalProps={{
          keepMounted: true,
          onBackdropClick: handleDrawerClose,
          sx: {
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: { xs: "16px 16px 0 0", sm: 0 },
            height: { xs: "calc(100% - 56px)", sm: "100%" },
            top: { xs: "auto", sm: 0 },
          },
        }}
      >
        {cartContent}
      </Drawer>
    </>
  );
}

export default Cart;
