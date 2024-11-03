import React from "react";
import { Box, Typography, Container, Card, CardMedia, CardContent } from "@mui/material";
import Layout from "./layout";
import { useNavigate } from 'react-router-dom';


const Resources = () => {
  const [value, setValue] = React.useState(2);
  const navigate = useNavigate();

  return (
    <Layout>
      <Box display="flex" justifyContent="center" width="100%">
        <Box width={393} height={852} bgcolor="white" position="relative">

          <Container sx={{ mt: 2 }}>
            <Card sx={{ mb: 2, bgcolor: '#ffefef', borderRadius: 2 }} onClick={() => navigate("/BusSchedule")}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Bus Schedule
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.PUBLIC_URL}/static/img/rectangle-7.png`}
                alt="Bus Schedule"
              />
            </Card>
            <Card sx={{ mb: 2, bgcolor: '#ffefef', borderRadius: 2 }} onClick={() => navigate("/Dining")}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Dining Options
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.PUBLIC_URL}/static/img/rectangle-8.png`}
                alt="Dining Options"
              />
            </Card>
            <Card sx={{ mb: 2, bgcolor: '#ffefef', borderRadius: 2 }} onClick={() => navigate("/faq")}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Frequently Asked
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.PUBLIC_URL}/static/img/rectangle-9.png`}
                alt="Frequently Asked"
              />
            </Card>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
};

export default Resources;