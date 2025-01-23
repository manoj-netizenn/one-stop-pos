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

function Cart({ items, quantities, onQuantityChange, onRemove, onCheckout }) {
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

  const cartContent = (
    <>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ShoppingCartIcon /> Shopping Cart
        </Typography>
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
        onClick={() => setIsOpen(true)}
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
      >
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {cartContent}
      </Drawer>
    </>
  );
}

export default Cart;
