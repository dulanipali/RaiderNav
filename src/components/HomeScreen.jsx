import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./layout";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const popularServices = [
    {
      name: "Writing Center",
      description: "Get help with your essays and academic papers.",
      image: "/placeholder.svg?height=130&width=130",
    },
    {
      name: "Food Pantry",
      description: "Access to free food and essentials for students in need.",
      image: "/placeholder.svg?height=130&width=130",
    },
  ];

  const campusServices = [
    "Writing Center",
    "Food Pantry",
    "Career Services",
    "Health Center",
    "Counseling Services",
    "Tutoring Center",
    "Library Services",
    "IT Help Desk",
    "Financial Aid Office",
    "Student Activities Office",
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = campusServices.filter((service) =>
        service.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    // Here you would typically navigate to the service page or show more details
    console.log(`Navigating to ${suggestion} page`);
  };

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingX={2}
        boxSizing="border-box"
        width="100vw"
        overflowX="hidden"
      >
        <DotLottieReact
          src="https://lottie.host/34cba75f-eb5b-4008-9cb4-007a98956fbd/fW0mQgN2gZ.lottie"
          loop
          autoplay
        />
        <Button
          variant="contained"
          startIcon={<DirectionsIcon />}
          onClick={() => handleNavigation("/map")}
          sx={{
            backgroundColor: "#660708",
            borderRadius: 50,
            height: 45,
            px: 4,
            "&:hover": {
              backgroundColor: "#490506",
            },
          }}
        >
          <Typography variant="button" style={{ color: "white" }}>
            Get Directions
          </Typography>
        </Button>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          mb={3}
          px={2}
          maxWidth="600px"
          gap={2}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNavigation("/services")}
            sx={{
              backgroundColor: "#660708",
              borderRadius: 50,
              height: 45,
              "&:hover": {
                backgroundColor: "#490506",
              },
            }}
          >
            <Typography variant="button" style={{ color: "white" }}>
              Services
            </Typography>
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNavigation("/dining")}
            sx={{
              backgroundColor: "#660708",
              borderRadius: 50,
              height: 45,
              "&:hover": {
                backgroundColor: "#490506",
              },
            }}
          >
            <Typography variant="button" style={{ color: "white" }}>
              Dining
            </Typography>
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNavigation("/BusSchedule")}
            sx={{
              backgroundColor: "#a4161a",
              borderRadius: 50,
              height: 45,
              "&:hover": {
                backgroundColor: "#490506",
              },
            }}
          >
            <Typography variant="button" style={{ color: "white" }}>
              Bus
            </Typography>
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNavigation("/faq")}
            sx={{
              backgroundColor: "#ba181b",
              borderRadius: 50,
              height: 45,
              "&:hover": {
                backgroundColor: "#490506",
              },
            }}
          >
            <Typography variant="button" style={{ color: "white" }}>
              FAQ
            </Typography>
          </Button>
        </Box>

      </Box>
    </Layout>
  );
};

