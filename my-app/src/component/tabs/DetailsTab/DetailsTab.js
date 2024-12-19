"use client";
import UserContext from "@/context/UserContext";
import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
const DetailsTab = () => {
  const { selectedMovie, setCartMovies, count, cartMovies, setCount } =
    useContext(UserContext);

  // Handle adding items to the cart.
  const handleAddList = () => {
    if (selectedMovie) {
      const newCartMovies = [...cartMovies, selectedMovie]; // Create a new array
      setCartMovies(newCartMovies); // Update state
      setCount(newCartMovies.length); // Set the new count based on the new array
    }
  };

  // Set cartMovies and cartCount data from local storage.
  useEffect(() => {
    localStorage.setItem("cartMovies", JSON.stringify(cartMovies));
    localStorage.setItem("cartCount", JSON.stringify(count));
  }, [cartMovies, count]);

  if (!selectedMovie) {
    return null; 
  }

  return (
    <>
      <div className="detail-tab text-white">
        <div className="details-cart ">
          <div className="details-score">
            <div className="score-border">
              <Typography>Score</Typography>
              <Typography className="text-2xl font-bold">
                {selectedMovie.score}
              </Typography>
              <Typography className="small-text">
                {selectedMovie.scored_by} Users
              </Typography>
            </div>
            <div className="score-border">
              <Typography>Ranked #{selectedMovie.rank}</Typography>
              <div className="rank-section">
                <Typography className="small-text">
                  {selectedMovie.season}
                </Typography>
                <Typography className="small-text">
                  {selectedMovie.year}
                </Typography>
              </div>
            </div>
            <div className="score-border">
              <Typography>Popularity #{selectedMovie.popularity}</Typography>
              <Typography className="small-text">
                {selectedMovie.type}
              </Typography>
            </div>
            <div className="member-border ">
              <Typography>Members #{selectedMovie.members}</Typography>
              <Typography className="small-text">
                {selectedMovie.studios[0].name}
              </Typography>
            </div>
          </div>
            {/* <Button className="tabs-button">
             <PlayArrowIcon/>Play
            </Button> */}
            <Button onClick={handleAddList} className="tabs-button">
            <AddIcon/>My List
            </Button>
        </div>
        <Typography className="para-text">Synopsis</Typography>
        <Typography className="text-4xl">{selectedMovie.synopsis}</Typography>
        {selectedMovie.background ? (
          <>
            <Typography className="para-text">Background</Typography>
            <Typography>{selectedMovie.background}</Typography>
          </>
        ) : null}
      </div>
    </>
  );
};

export default DetailsTab;
