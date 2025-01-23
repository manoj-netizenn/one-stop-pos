/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function Checkout({ cart, quantities, customerDetails, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit",
  });

  const [errors, setErrors] = useState({});

  const steps = ["Review Order", "Payment Method", "Confirm Payment"];

  const calculateItemTotal = (item) => {
    return item.price * (quantities[item.id] || 1);
  };

  const total = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  const validateForm = () => {
    const newErrors = {};
    if (!paymentDetails.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Invalid card number";
    }
    if (!paymentDetails.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
    }
    if (!paymentDetails.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onComplete(paymentDetails);
    } else {
      setErrors(newErrors);
    }
  };

  const handleNext = () => {
    if (activeStep === 1) {
      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {cart.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 1,
                    borderBottom:
                      index < cart.length - 1 ? "1px solid #eee" : "none",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {item.duration}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {quantities[item.id] || 1}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          ₹{item.price.toLocaleString("en-IN")} ×{" "}
                          {quantities[item.id] || 1}
                        </Typography>
                      </Box>
                    }
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    ₹{calculateItemTotal(item).toLocaleString("en-IN")}
                  </Typography>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: 2,
                p: 2,
                bgcolor: "background.default",
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="body1">
                  ₹{total.toLocaleString("en-IN")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h6" color="primary">
                  ₹{total.toLocaleString("en-IN")}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    name="paymentMethod"
                    value={paymentDetails.paymentMethod}
                    onChange={handleChange}
                    label="Payment Method"
                  >
                    <MenuItem value="credit">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CreditCardIcon /> Credit Card
                      </Box>
                    </MenuItem>
                    <MenuItem value="debit">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PaymentIcon /> Debit Card
                      </Box>
                    </MenuItem>
                    <MenuItem value="bank">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccountBalanceIcon /> Bank Transfer
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cardNumber"
                  label="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="expiryDate"
                  label="Expiry Date (MM/YY)"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="cvv"
                  label="CVV"
                  type="password"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Confirm Payment
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                Please review your order and payment details before confirming.
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, my: 4 }}>
      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 4,
          display: { xs: "none", sm: "flex" },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Mobile stepper */}
      <Box sx={{ display: { xs: "block", sm: "none" }, mb: 3 }}>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Step {activeStep + 1} of {steps.length}
        </Typography>
        <Typography variant="h6" align="center">
          {steps[activeStep]}
        </Typography>
      </Box>

      {renderStepContent(activeStep)}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} disabled={processing}>
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={processing}
            startIcon={processing && <CircularProgress size={20} />}
          >
            {processing ? "Processing..." : "Complete Payment"}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>

      {errors.submit && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errors.submit}
        </Typography>
      )}
    </Paper>
  );
}

export default Checkout;
