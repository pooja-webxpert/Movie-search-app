"use client";
import UserContext from "@/context/UserContext";
import { routesUrl } from "@/utils/pagesurl";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Home = () => {
  const router = useRouter();
  const { apiData, searchQuery, setSelectedMovie } = useContext(UserContext);

  // Filter the API data based on the search query, checking any word
  const filteredApiData = searchQuery
  ? apiData.filter((item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
  : apiData;


  // Handle the click event when navigating to the movie details.
  const handleClick = (item) => {
    if (item) {
      setSelectedMovie(item);
      router.push(routesUrl.moviedetails);
    }
  };

  return (
    <div className="home-page">
      <Container className="p-0">
        <div className="text-white">
          <div className="text-center mb-10">
            <Typography className="pt-12 free-movie" variant="h3">
              Free Movies to Watch, Anytime Anywhere.
            </Typography>
            <Typography className="free-movie" variant="h6">
              The search is over! Let Plex help you find the perfect movie to watch tonight for free.
            </Typography>
          </div>

          <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {filteredApiData.length > 0 ? (
              filteredApiData.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id || item.title}>
                  <Box
                    height={480}
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
                        src={item.images?.jpg?.image_url}
                        className="w-full h-72 object-cover"
                        alt={item.title}
                      />
                    </div>
                    <div className="mt-5">
                      <strong>Movie Name: </strong>
                      {item.title}
                    </div>
                    <div className="mt-1">
                      <strong>Rating: </strong>
                      {item.rating}
                    </div>
                    <div className="hover:bg-stone-900 m-auto rounded-lg border w-28 mt-6 text-center">
                      <Button className="text-white" onClick={() => handleClick(item)}>
                        Watch Now
                      </Button>
                    </div>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography variant="h5" className="!m-auto">No movie found</Typography>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Home;
