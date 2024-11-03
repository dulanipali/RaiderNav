import React from "react";
import { Box, Typography } from "@mui/material";
import Layout from "./layout";

const BusSchedule = () => {
  return (
    <Layout>
      <Box display="flex" justifyContent="center" width="100vw" alignItems={"center"} alignContent={"center"}>
        <Box position="relative" gap={20} style={{ marginTop: 16, marginLeft: 46, marginRight: 46 }}>
          <Typography
            variant="h5"
            component="div"
            mb={'20px'}
            //top={99}
            //left={42}
            sx={{ fontFamily: 'Roboto', fontWeight: 'normal' }}
          >
            Bus Schedule
          </Typography>
          <Box
            //top={170}
            //left={42}
            width={'80vw'}
            height={'50vh'}
            sx={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/static/img/frame-3.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'scroll',
            }}
          />
          <Typography
            variant="h6"
            component="div"
            //stop={523}
            //left={51}
            mt={'20px'}
            sx={{ fontFamily: 'Roboto', fontWeight: 'normal' }}
          >
            Operation hours
          </Typography>
          <Typography
            variant="body1"
            component="div"
            //top={570}
            //left={56}
            sx={{ fontFamily: 'Roboto', fontWeight: 'normal' }}
          >
            Days and times
          </Typography>

          <Typography
            variant="body1"
            component="p"
            //top={684}
            //left={56}
            mt={'20px'}
            sx={{ fontFamily: 'Roboto', fontWeight: 'normal' }}
          >
            For more information, check out the Citibus website.
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ fontFamily: 'Roboto', fontWeight: 'normal', color: 'grey' }}
          >
            <a href="https://citibus.com/maps-and-schedules/" target="_blank" rel="noopener noreferrer" style={{ color: 'grey', textDecoration: 'none' }}>
              https://citibus.com/maps-and-schedules/
            </a>
          </Typography>

        </Box>
      </Box>
    </Layout>
  );
};

export default BusSchedule; // Default export