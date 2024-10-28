"use client";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import { Container, Grid, Paper, Typography } from "@mui/material";
import TabsWrappedLabel from "@/component/tabs/tabs";

const MovieDetails = () => {
  const { selectedMovie } = useContext(UserContext);
  
  return (
    <>
      <div className="home-page py-7 text-white ">
        <Container>
          {selectedMovie ? (
            <div className="border border-zinc-400 pb-5">
              <Typography className="pl-5" variant="h5" component="h2">
                {selectedMovie.title}
              </Typography>
              <hr className="w-full" />
              <Grid className="mx-2 my-1" container spacing={2}>
                <Grid item xs={12} sm={2.5}>
                  <Paper>
                    <img src={selectedMovie.images.jpg.image_url} className="w-60 h-full" />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Paper>
                    <TabsWrappedLabel/>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          ) : (
            <Typography variant="h5" className="text-center" component="div">
              No movie selected
            </Typography>
          )}
        </Container>
      </div>
    </>
  );
};

export default MovieDetails;
