"use client";
import UserContext from "@/context/UserContext";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { successMsg } from "@/component/Toastmsg/toaster";

const AddToCart = () => {
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null); // State to hold the index of the item to be deleted

  const handleClickOpen = (index) => {
    setDeleteIndex(index); // Set the index of the item to be deleted
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteIndex(null); // Reset the index when closing the dialog
  };

  const router = useRouter();
  const { cartMovies, setCartMovies, setCount } = useContext(UserContext);

  // Handle click when the cart is empty and navigate to the home page
  const handleClick = () => {
    router.push("/");
  };

  // Remove card items
  const handleCartDelete = () => {
    if (deleteIndex !== null) {
      const updatedCartMovies = cartMovies.filter((_, i) => i !== deleteIndex);
      setCartMovies(updatedCartMovies);
      setCount(updatedCartMovies.length);

      // Update local storage
      localStorage.setItem('cartMovies', JSON.stringify(updatedCartMovies));
      localStorage.setItem('cartCount', JSON.stringify(updatedCartMovies.length));
    }
    handleClose(); // Close the dialog
    successMsg("Movie cart is delete successfully")
  };

  return (
    <>
      <div className="home-page py-7 text-white">
        {cartMovies.length > 0 ? (
          cartMovies.map((movie, index) => (
            <div
              key={index}
              className="m-auto  w-1/2 h-56 grid grid-cols-3 items-center px-5  mb-6 bg-neutral-700"
            >
              <img
                className="w-44 h-48"
                src={movie.images.jpg.image_url}
                alt={movie.title}
              />
              <div className="col-span-2 flex">
                <div className="w-full">
                  <Typography variant="h5">Movie Name: {movie.title}</Typography>
                  <Typography variant="h6">Rank: {movie.rank}</Typography>
                  <Typography variant="h6">Score: {movie.score}</Typography>
                  <Typography variant="h6">Year: {movie.year}</Typography>
                </div>
                <div
                  className="delete-icon text-red-700 cursor-pointer bg-slate-50 rounded-full !h-10 !w-12 flex justify-center items-center"
                  onClick={() => handleClickOpen(index)} // Open the dialog with the index
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-item flex justify-center items-center">
          <div>
          <Typography className="text-center" variant="h5">
            There are no items in the cart. Please click the button to add movies.
          </Typography>
          <div className="flex">
            <Button onClick={handleClick} className="!m-auto !mt-2 !p-2 !rounded-md !bg-neutral-100 !text-gray-500 !hover:text-neutral-200">
              Go to Home Page</Button>
          </div>
          </div>
          </div>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this movie from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCartDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToCart;



