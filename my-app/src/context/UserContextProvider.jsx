"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [cartMovies, setCartMovies] = useState([]);
  const [count, setCount] = useState(0);

// get cartMovies and cartCount data from local storage.
  useEffect(() => {
    const storedMovies = localStorage.getItem('cartMovies');
    const storedCount = localStorage.getItem('cartCount');
    if (storedMovies) {
      setCartMovies(JSON.parse(storedMovies));
    }
    if (storedCount) {
      setCount(JSON.parse(storedCount));
    }
  }, []);

  const getApi = async () => {
    try {
      const response = await axios.get("https://api.jikan.moe/v4/anime");
      setApiData(response.data.data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <UserContext.Provider
      value={{
        apiData,
        searchQuery,
        setSearchQuery,
        selectedMovie,
        setSelectedMovie,
        cartMovies,
        setCartMovies, // Make this available in the context
        count,
        setCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
