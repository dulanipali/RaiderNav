import React from "react";
import { Box, Typography } from "@mui/material";
import Layout from "./layout";

const DiningOptions = () => {
  return (
    <Layout>
      <Box display="flex" flexDirection={'column'} justifyContent="center" width="100vw" maxHeight="100vh" alignItems={"center"} alignContent={"center"}>
        <Box position="relative" bgcolor="white" style={{ marginTop: '16px', marginLeft: 46, marginRight: 46 }}>
          <Box >
            <Typography variant="h5" component="div" sx={{ fontFamily: 'Roboto', fontWeight: 'normal', color: 'black' }}>
              Dining Options
            </Typography>
          </Box>
          <Box sx={{ mt: '20px', mb: '15px' }}>
            <Typography variant="body1" component="div" sx={{ fontFamily: 'Roboto', fontWeight: 'normal', color: 'black' }}>
              Explore various dining options available on campus.
            </Typography>
          </Box>
          <Box height={'60vh'} sx={{ backgroundImage: `url(${process.env.PUBLIC_URL}/static/img/frame-2.png)`, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'scroll' }} />
          <Box >
            <Typography variant="body1" component="div" sx={{ fontFamily: 'Roboto', fontWeight: 'normal', color: 'black', mt: '20px' }}>
              For more information, check out the Hospitality website.
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontFamily: 'Roboto', fontWeight: 'normal', color: 'grey', mb: '16px' }}>
              <a href="https://www.depts.ttu.edu/hospitality/" target="_blank" rel="noopener noreferrer" style={{ color: 'grey', textDecoration: 'none' }}>
                https://www.depts.ttu.edu/hospitality/
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default DiningOptions;