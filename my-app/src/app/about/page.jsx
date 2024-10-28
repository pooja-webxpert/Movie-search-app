import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
  
const AboutPage = () => {
  return (
    <>
    <div className="main-page pt-10 pb-8">
      <Container className="">
        <Box className="text-stone-200" sx={{ textAlign: "center" ,color:"white" }}>
        <Typography variant="h2" gutterBottom>
              Welcome to the About Page
            </Typography>
            <Typography variant="body1" paragraph>
              This is the starting point of our amazing app. Here you can find
              information about our features and how to get started.
              
            </Typography>
            <Typography variant="h2" gutterBottom>
              Features
            </Typography>
            <Typography variant="body1" paragraph >
              - Feature 1: Description of the first feature.
            </Typography>
            <Typography variant="body1" paragraph>
              - Feature 2: Description of the second feature.
            </Typography>
            <Typography variant="body1" paragraph>
              - Feature 3: Description of the third feature.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" className="!bg-red-700 mb-6 !hover:bg-red-800">
                Learn More
              </Button>
            </Box>
        </Box>
      </Container>
    </div>
    </>
  );
};

export default AboutPage;
