import React from "react";
import { Box, Typography, Accordion, AccordionActions, AccordionSummary, AccordionDetails, List, ListItem } from "@mui/material";
import Layout from "./layout";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  return (
    <Layout>
      <Box display="flex" justifyContent="center" width="100vw" alignItems={"center"} alignContent={"center"}>
        <Box position="relative" bgcolor="white">
          <Typography variant="h5" style={{ marginTop: 16, marginLeft: 46 }} sx={{ fontFamily: 'Roboto' }}>
            Frequently Asked Questions
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" sx={{ mt: '20px' }} style={{ marginTop: 16, marginLeft: 46, marginRight: 46 }}>
            <Accordion
              sx={{ backgroundColor: "#fff7f7" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Where to get my student ID?
              </AccordionSummary>
              <AccordionDetails>
                Go visit the Student ID office at the SUB!
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor: "#fff7f7" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                I’m sick. Where do I go?
              </AccordionSummary>
              <AccordionDetails>
                Check out the Student Health Center. Call the number and make an appointment with them.
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor: "#fff7f7" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                I lost my student ID
              </AccordionSummary>
              <AccordionDetails>
                Oh no, make sure to report it asap! Go to the sub and see if someone has found and returned it.
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor: "#fff7f7" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                Where to find class information?
              </AccordionSummary>
              <AccordionDetails>
                Check out Raiderlink or Blackboard.
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Faq;