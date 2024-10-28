"use client";
import UserContext from "@/context/UserContext";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";

const MovieData = () => {
  const { apiData,searchQuery } = useContext(UserContext); // get api data from Context API

   // Filter the API data based on the search query, or show all if no search query
   const filteredApiData = searchQuery
   ? apiData.filter((item) =>
       item.title?.toLowerCase().startsWith(searchQuery.toLowerCase())
     )
   : apiData;

  return (
    <div className="main-page ">
      <Container className="p-0">
        <div className="text-stone-200">
          <Typography variant="h4">Movies: </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          >
            {filteredApiData.length > 0 ? (
              filteredApiData.map((item,index) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Link href={item.url}>
                      <Box
                          height={450}
                        border={1}
                        margin={1}
                        padding={2}
                        borderRadius={1}
                        sx={{
                          boxShadow: "0px 2px 5px 3px gray",
                          borderColor: "rgba(0, 0, 0, 0.12)",
                          transition: "0.3s", 
                          "&:hover": {
                            boxShadow: "0px 4px 10px 6px gray", 
                            borderColor: "rgba(0, 0, 0, 0.5)",
                          },
                        }}
                      >
                        <div className="mt-1">
                          <img
                            src={item.images?.jpg.image_url}
                            className="w-full h-72"
                          />
                        </div>
                        <div className="mt-5">
                          <b>Movie Name: </b>
                          {item.title}
                        </div>
                        <div className="mt-1">
                          <b>Rating: </b>
                          {item.rating}
                        </div>                      
                      </Box>
                    </Link>
                  </Grid>
                );
              })
            ) : (
              <Typography variant="h5" className="!m-auto">No movie found</Typography>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default MovieData;
