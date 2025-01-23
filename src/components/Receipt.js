import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "./Logo";

function Receipt({ data, onNewOrder }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("receipt-content");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${data.orderNumber}.pdf`);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: { xs: 2, sm: 0 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 3,
          textAlign: "center",
          bgcolor: "#6B46C1",
          color: "white",
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="h6">
          Amount Paid: ₹{data.total.toLocaleString("en-IN")}
        </Typography>
      </Paper>

      <Paper sx={{ p: { xs: 2, sm: 4 } }} id="receipt-content">
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Box sx={{ mb: 2 }}>
              <Logo size="large" onClick={onNewOrder} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Receipt
            </Typography>
            <Typography color="text.secondary">
              Order #{data.orderNumber}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Payment Date
            </Typography>
            <Typography>{formatDate(data.date)}</Typography>
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Billed To
            </Typography>
            <Typography variant="body1">
              {data.customer.firstName} {data.customer.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.customer.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.customer.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Payment Method
            </Typography>
            <Chip
              icon={<ReceiptIcon />}
              label={`${data.payment.paymentMethod.toUpperCase()} Card`}
              variant="outlined"
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Card ending in ****{data.payment.cardNumber.slice(-4)}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        <List>
          {data.items.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  py: 2,
                  px: 0,
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
                        ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                      </Typography>
                    </Box>
                  }
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </Typography>
              </ListItem>
              {index < data.items.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Box
          sx={{
            bgcolor: "background.default",
            p: 3,
            borderRadius: 1,
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography color="text.secondary">Subtotal</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography>₹{data.total.toLocaleString("en-IN")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary">Tax</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography>₹0</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Total</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="h6" color="primary">
                ₹{data.total.toLocaleString("en-IN")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
          fullWidth
        >
          Download Receipt
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNewOrder}
          fullWidth
        >
          Place New Order
        </Button>
      </Box>
    </Box>
  );
}

export default Receipt;
