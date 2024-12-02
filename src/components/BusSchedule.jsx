import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  Container,
  Grid,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestoreIcon from '@mui/icons-material/Restore';
import Layout from "./layout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#660708",
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
});

const BusSchedule = () => {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [showTabs, setShowTabs] = useState(false);

  const busRoutes = [
    {
      route: "42: Red Raider",
      days: "Mon-Fri",
      stops: [
        "West Commuter Stop1",
        "Student Recreation Center",
        "Student Wellness Center",
        "College of Business Administration",
        "Commuter North",
        "Holden Hall",
        "Student Union Building",
        "Library",
        "College of Education",
        "Weymouth-Chitwood Hall"
      ]
    },
    {
      route: "41: Double T",
      days: "Mon-Fri",
      stops: [
        "Commuter West C-16",
        "Commuter Satellite",
        "West Village",
        "Weymouth-Chitwood Hall",
        "Wall Hall",
        "Akron Ave & 15th St.",
        "West Hall",
        "Commuter North",
        "College of Business Administration C4",
        "Student Rec Center"
      ]
    }
  ];

  const handleRouteChange = (event, newValue) => {
    setSelectedRoute(newValue);
  };

  const handleShowTabs = () => {
    setShowTabs(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h5"
            component="div"
            mb={'20px'}
            //top={99}
            ml={'20px'}
            sx={{
              fontFamily: 'Roboto, Helvetica', fontWeight: 'normal'
            }}
          >
            Bus Schedule
            {/* <DirectionsBusIcon sx={{ mr: 1 }} /> */}
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>

                <TransformWrapper
                  initialScale={1}
                  minScale={1}
                  maxScale={3}
                  wheel={{ step: 0.1 }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => zoomIn()} startIcon={<ZoomInIcon />} sx={{ mr: 1, backgroundColor: 'primary.main', color: 'background.paper' }}>Zoom In</Button>
                        <Button onClick={() => zoomOut()} startIcon={<ZoomOutIcon />} sx={{ mr: 1, backgroundColor: 'primary.main', color: 'background.paper' }}>Zoom Out</Button>
                        <Button onClick={() => resetTransform()} startIcon={<RestoreIcon />} sx={{ backgroundColor: 'primary.main', color: 'background.paper' }}>Reset</Button>
                      </Box>
                      <TransformComponent>
                        <Box
                          component="img"
                          src={`${process.env.PUBLIC_URL}/static/img/bus_routes.png`}
                          alt="Bus Routes"
                          sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: "contain",
                          }}
                        />
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  Operation Hours
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Monday - Friday: 7:00 AM - 6:00 PM
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleShowTabs}
                  sx={{ mb: 2, width: '100%', backgroundColor: 'primary.main', color: 'background.paper' }}
                >
                  {showTabs ? "Hide Bus Routes" : "View Bus Routes"}
                </Button>

                {showTabs && (
                  <Box sx={{ mb: 2 }}>
                    <Tabs
                      value={selectedRoute}
                      onChange={handleRouteChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      sx={{ mb: 2 }}
                    >
                      {busRoutes.map((route, index) => (
                        <Tab key={index} label={route.route} sx={{ color: 'text.primary' }} />
                      ))}
                    </Tabs>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                      {busRoutes[selectedRoute].route} ({busRoutes[selectedRoute].days})
                    </Typography>
                    <List disablePadding>
                      {busRoutes[selectedRoute].stops.map((stop, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText primary={stop} />
                          </ListItem>
                          {index < busRoutes[selectedRoute].stops.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )}

                <Typography variant="h6" gutterBottom sx={{ mt: 2, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <InfoIcon sx={{ mr: 1 }} />
                  More Information
                </Typography>
                <Typography variant="body2" paragraph>
                  For more details, visit the Citibus website:
                </Typography>
                <Link
                  href="https://citibus.com/maps-and-schedules/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'primary.main' }}
                >
                  Citibus Maps and Schedules
                </Link>
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default BusSchedule;

