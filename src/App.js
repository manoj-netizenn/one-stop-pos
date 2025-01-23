import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import InsightsIcon from "@mui/icons-material/Insights";
import CampaignIcon from "@mui/icons-material/Campaign";
import ServiceCatalog from "./components/ServiceCatalog";
import Cart from "./components/Cart";
import CustomerForm from "./components/CustomerForm";
import Checkout from "./components/Checkout";
import Receipt from "./components/Receipt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "./components/Logo";
import LoadingPage from "./components/LoadingPage";
//import "./App.css";
import theme from "./theme.js";
import "./styles/global.css";

function App() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [step, setStep] = useState("catalog");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleAddToCart = (service) => {
    setCart([...cart, service]);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleCustomerSubmit = (details) => {
    setCustomerDetails(details);
    setStep("checkout");
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (sum, item) => sum + item.price * (quantities[item.id] || 1),
      0
    );
  };

  const handleCheckoutComplete = async (paymentDetails) => {
    setIsLoading(true);

    try {
      // Initial processing
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setLoadingComplete(true);

      // Additional verification time
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const receiptData = {
        orderNumber: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        items: cart.map((item) => ({
          ...item,
          quantity: quantities[item.id] || 1,
        })),
        customer: customerDetails,
        payment: paymentDetails,
        total: calculateTotal(),
      };

      setReceipt(receiptData);
      setStep("receipt");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsLoading(false);
      setLoadingComplete(false);
    }
  };

  const handleBack = () => {
    switch (step) {
      case "customer":
        setStep("catalog");
        break;
      case "checkout":
        setStep("customer");
        break;
      case "receipt":
        setStep("checkout");
        break;
      default:
        setStep("catalog");
    }
  };

  const handleLogoClick = () => {
    setStep("catalog");
    setCart([]);
    setCustomerDetails(null);
    setReceipt(null);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Scheduling", icon: <CalendarMonthIcon /> },
    { text: "Client Management", icon: <PeopleIcon /> },
    { text: "Analytics", icon: <InsightsIcon /> },
    { text: "Marketing", icon: <CampaignIcon /> },
  ];

  const renderContent = () => {
    if (isLoading) {
      return <LoadingPage isComplete={loadingComplete} />;
    }

    switch (step) {
      case "catalog":
        return (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Choose Your Service
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome to One Stop  Your all-in-one platform for managing
                services, appointments, and much more
              </Typography>
            </Box>
            <ServiceCatalog onAddToCart={handleAddToCart} />
          </>
        );
      case "customer":
        return (
          <>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ mb: 2 }}
            >
              Back to Services
            </Button>
            <CustomerForm onSubmit={handleCustomerSubmit} />
          </>
        );
      case "checkout":
        return (
          <>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ mb: 2 }}
            >
              Back to Customer Details
            </Button>
            <Checkout
              cart={cart}
              quantities={quantities}
              customerDetails={customerDetails}
              onComplete={handleCheckoutComplete}
            />
          </>
        );
      case "receipt":
        return (
          <>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ mb: 2 }}
            >
              Back to Payment
            </Button>
            <Receipt
              data={receipt}
              onNewOrder={() => {
                setCart([]);
                setCustomerDetails(null);
                setReceipt(null);
                setStep("catalog");
              }}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "white",
            color: "text.primary",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Logo size="medium" onClick={handleLogoClick} />
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderColor: "primary.light",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderColor: "primary.light",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  background:
                    "linear-gradient(45deg, #6B46C1 30%, #805AD5 90%)",
                  boxShadow: "0 3px 12px rgba(107, 70, 193, 0.2)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #553C9A 30%, #6B46C1 90%)",
                    boxShadow: "0 4px 14px rgba(107, 70, 193, 0.3)",
                  },
                }}
              >
                Try For Free
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    borderRadius: "0 24px 24px 0",
                    mr: 2,
                    mb: 1,
                    "&:hover": {
                      bgcolor: "rgba(107, 70, 193, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 240,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "none",
            },
            display: { xs: "none", sm: "block" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", mt: 2 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  sx={{
                    borderRadius: "0 24px 24px 0",
                    mr: 2,
                    mb: 1,
                    "&:hover": {
                      bgcolor: "rgba(107, 70, 193, 0.08)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            bgcolor: "background.default",
            minHeight: "100vh",
            width: { xs: "100%", sm: `calc(100% - 240px)` },
          }}
        >
          <Toolbar />
          {renderContent()}
        </Box>

        <Cart
          items={cart}
          quantities={quantities}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveFromCart}
          onCheckout={() => setStep("customer")}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
