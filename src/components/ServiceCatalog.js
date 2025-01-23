import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SpaIcon from "@mui/icons-material/Spa";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import DanceIcon from "@mui/icons-material/TheaterComedy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ChildCareIcon from "@mui/icons-material/ChildCare";

const services = [
  {
    id: 1,
    name: "Personal Training Session",
    description: "1-hour personal training session with certified trainer",
    price: 2500.0,
    duration: "50 min ",
    icon: <FitnessCenterIcon />,
    color: "#1890ff",
    available: true,
  },
  {
    id: 2,
    name: "Group Fitness Class",
    description: "Join our energetic group fitness classes",
    price: 1000.0,
    duration: "45 min",
    icon: <EventIcon />,
    color: "#52c41a",
    available: true,
  },
  {
    id: 3,
    name: "Physiotherapy Session",
    description: "Professional physiotherapy treatment",
    price: 3000.0,
    duration: "45 min",
    icon: <SpaIcon />,
    color: "#722ed1",
    available: true,
  },
  {
    id: 4,
    name: "Nutrition Consultation",
    description: "Personalized nutrition planning and advice",
    price: 1500.0,
    duration: "90 min",
    icon: <RestaurantIcon />,
    color: "#eb2f96",
    available: true,
  },

  {
    id: 5,
    name: "Luxury Spa Package",
    description:
      "Indulge in a relaxing spa day with facial, massage, and aromatherapy",
    price: 4500.0,
    duration: "120 min",
    icon: <FaceRetouchingNaturalIcon />,
    color: "#f759ab",
    available: false,
  },
  {
    id: 6,
    name: "Beauty Treatment",
    description:
      "Complete beauty treatment including facial, manicure, and pedicure",
    price: 3500.0,
    duration: "90 min",
    icon: <SpaIcon />,
    color: "#eb2f96",
    available: true,
  },
  {
    id: 7,
    name: "Yoga Class",
    description:
      "Rejuvenating yoga sessions with experienced instructors for all levels",
    price: 800.0,
    duration: "45 min",
    icon: <SelfImprovementIcon />,
    color: "#13c2c2", // Teal
    available: true,
  },
  {
    id: 10,
    name: "Professional Babysitting",
    description: "Experienced and certified babysitters for childcare needs",
    price: 800.0,
    duration: "240 min",
    icon: <ChildCareIcon />,
    color: "#ff4d4f", // Red
    available: true,
  },
  {
    id: 8,
    name: "Dance Fitness",
    description: "Fun and energetic dance workouts combining different styles",
    price: 1200.0,
    duration: "45 min",
    icon: <DanceIcon />,
    color: "#fa8c16", // Orange
    available: true,
  },
  {
    id: 9,
    name: "Private Yoga Session",
    description: "One-on-one personalized yoga training for focused attention",
    price: 2000.0,
    duration: "60 min",
    icon: <SelfImprovementIcon />,
    color: "#722ed1", // Purple
    available: false,
  },
  {
    id: 11,
    name: "Event Planning",
    description:
      "Professional event planning services for all occasions including birthdays, anniversaries, and corporate events",
    price: 15000.0,
    duration: "Varies",
    icon: <EventAvailableIcon />,
    color: "#fa541c", // Orange red
    available: true,
  },
  
];

function ServiceCatalog({ onAddToCart }) {
  return (
    <Grid container spacing={2}>
      {services.map((service) => (
        <Grid item xs={12} sm={6} md={4} key={service.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                "& .MuiAvatar-root": {
                  transform: "scale(1.1)",
                  bgcolor: (theme) => `${service.color}25`,
                },
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: `${service.color}15`,
                    color: service.color,
                    mr: 2,
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {service.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {service.name}
                  </Typography>
                  <Chip
                    label={service.available ? "Available" : "Fully Booked"}
                    size="small"
                    color={service.available ? "success" : "default"}
                  />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {service.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color="primary">
                  ₹{service.price.toLocaleString("en-IN")}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <EventIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  {service.duration}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<AddShoppingCartIcon />}
                onClick={() => onAddToCart(service)}
                disabled={!service.available}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ServiceCatalog;
