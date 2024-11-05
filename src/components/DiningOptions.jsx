import React from "react";
import { Box, Typography } from "@mui/material";
import Layout from "./layout";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const DiningOptions = () => {
  return (
    <Layout>
      <Box display="flex"
        flexDirection="column"
        alignItems="center"
        paddingX={2}
        boxSizing="border-box"
        width="100vw"
        overflowX="hidden"
      >
        <Box position="relative" bgcolor="white" style={{ marginTop: '16px' }}>
          <Box >
            <Typography variant="h5"
              component="div"
              sx={{
                fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'black'
              }}>
              Dining Options
            </Typography>
          </Box>
          <Box sx={{ mt: '20px', mb: '15px' }}>
            <Typography variant="body1" component="div" sx={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'black' }}>
              Explore various dining options available on campus.
            </Typography>
          </Box>
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={4}
            wheel={{ step: 0.1 }}
          >
            <TransformComponent>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/static/img/dining_loc.jpg`}
                alt="Bus Routes"
                width="80vw"
                height="50vh"
                sx={{
                  objectFit: "contain",

                }} />
            </TransformComponent>
          </TransformWrapper>
          <Box >
            <Typography variant="body1" component="div" sx={{ fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'black', mt: '20px' }}>
              For more information, check out the Hospitality website.
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontFamily: 'Roboto, Helvetica', fontWeight: 'normal', color: 'grey', mb: '16px'
              }}>
              <a href="https://www.depts.ttu.edu/hospitality/" target="_blank" rel="noopener noreferrer" style={{ color: 'grey', textDecoration: 'none' }}>
                https://www.depts.ttu.edu/hospitality/
              </a>
            </Typography>
          </Box>
        </Box>
      </Box >
    </Layout >
  );
};

export default DiningOptions;