import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HelpIcon from "@mui/icons-material/Help";
import SchoolIcon from "@mui/icons-material/School";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Layout from "./layout";

export const HomeScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = [
    { icon: SchoolIcon, label: "Services", path: "/services", color: "#a4161a" },
    { icon: RestaurantIcon, label: "Dining", path: "/dining", color: "#a4161a" },
    { icon: DirectionsBusIcon, label: "Bus", path: "/BusSchedule", color: "#a4161a" },
    { icon: HelpIcon, label: "FAQ", path: "/faq", color: "#a4161a" },
  ];

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >

          <Box
            sx={{
              height: isMobile ? 200 : 300,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DotLottieReact
              src="https://lottie.host/34cba75f-eb5b-4008-9cb4-007a98956fbd/fW0mQgN2gZ.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </Box>

          <Typography>Need help navigating campus? We've got you covered.</Typography>
          <Button
            variant="contained"
            startIcon={<DirectionsIcon />}
            onClick={() => handleNavigation("/directions")}
            sx={{
              backgroundColor: "#660708",
              borderRadius: 50,
              height: 48,
              px: 4,
              mb: 4,
              mt: 4,
              "&:hover": {
                backgroundColor: "#490506",
              },
            }}
          >
            <Typography variant="button" sx={{ color: "white" }}>
              Get Directions
            </Typography>
          </Button>
          <Typography>Easily access everything you need with just a click</Typography>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            {menuItems.map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    '&:hover': {
                      backgroundColor: "#490507",
                    },
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      //height: 120,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: item.color,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: "#490507",
                      },
                    }}
                  >
                    <IconButton
                      sx={{
                        color: 'white',
                        mb: 1,
                      }}
                    >
                      <item.icon fontSize="medium" />
                    </IconButton>
                    <Typography variant="button">
                      {item.label}
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

