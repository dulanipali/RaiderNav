import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./layout";

export const HomeScreen = () => {
  // State for search input focus
  const [searchFocus, setSearchFocus] = useState(false);

  const navigate = useNavigate();

  // Handle navigation for drawer buttons
  const handleNavigation = (path) => {
    navigate(path);
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          //width={393}
          height={'50vh'}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/static/img//Basemap_image.svg)`,
            backgroundSize: 'contain',
            //backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
          }}
          mb={3}
          width="100%"
          minWidth="100vw"
        >
          <Box
            width="60%"
            //bgcolor="#d9d9d9"
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={2}
            borderRadius={2}
            mb={3}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Location...."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: { borderRadius: 50, backgroundColor: "white" },
              }}
            />
          </Box>
        </Box>

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          mb={3}
          px={2}
          maxWidth="600px" // Restrict button container width
          gap={2}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleNavigation("/dining")}

            sx={{
              backgroundColor: "#660708",
              borderRadius: 50,
              height: 45,
              '&:hover': {
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
              '&:hover': {
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
              '&:hover': {
                backgroundColor: "#490506",
              },
            }}
          >
            <Typography variant="button" style={{ color: "white" }}>
              FAQ
            </Typography>
          </Button>
        </Box>

        <Box
          width="100%"
          height={392}
          bgcolor="#f5f3f4"
          padding={2}
          maxWidth="100vw"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontFamily="Roboto, Helvetica"
            fontWeight="normal"
            color="black"
            mb={2}
          >
            Popular Campus Services
          </Typography>
          <Box width="90%" marginBottom={2}>
            {["Writing Center", "Food Pantry"].map((service) => (
              <Paper
                key={service}
                elevation={3}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  padding: 16,
                  backgroundColor: "white",
                }}
                sx={{
                  '&:hover': {
                    elevation: 6,
                    transform: "scale(1.01)",
                  },
                }}
              >
                <Box flex={1}>
                  <Typography variant="h6" color="#660708">
                    {service}
                  </Typography>
                  <Typography variant="body1" color="black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Typography>
                </Box>
                <Box width={130} height={130} bgcolor="#242323" border="1px solid white">
                  <img
                    alt={`${service} Image`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};
