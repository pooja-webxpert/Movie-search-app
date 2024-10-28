"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { routesUrl } from "@/utils/pagesurl";
import Link from "next/link";
import LogoutButton from "../shared/form/LogoutButton";
import FormInput from "../shared/form/formData";
import { useForm } from "react-hook-form";
import {
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function ResponsiveAppBar() {
  const router = useRouter();
  const { control, watch } = useForm();
  const { setSearchQuery, count } = useContext(UserContext);
  const { data: session } = useSession(); // Get session data
  const searchValue = watch("search");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog

  // Effect to update the search query in context
  useEffect(() => {
    setSearchQuery(searchValue || "");
  }, [searchValue]);

  const pathName = usePathname();
  if (pathName === routesUrl.signIn || pathName === routesUrl.signUp) {
    return null;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true); // Open dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
  };

  // open shopping cart
  const handleOpenCart = () => {
    if (session) {
      router.push(routesUrl.myList);
    } else {
      handleOpenDialog();
    }
  };

  const handleConfirmDialog = () => {
    handleCloseDialog(); // Close dialog
    router.push(routesUrl.signIn);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mx: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MovieSearchApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <Link href='/'>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>TV Shows</Typography>
                </MenuItem>
              </Link>
              <Link href={routesUrl.movies}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>Movies</Typography>
                </MenuItem>
                </Link>
                <Link href={routesUrl.about}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center" }}>Recently Added</Typography>
              </MenuItem>
                </Link>
                <Link href={routesUrl.myList}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center" }}>My List</Typography>
              </MenuItem>
                </Link>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MovieSearchApp
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: 17 } }}
          >
            <Link href="/">
              <Button
                className="hover:text-red-700"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                TV Shows
              </Button>
            </Link>

            <Link href={routesUrl.movies}>
              <Button
                className="hover:text-red-700"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Movies
              </Button>
            </Link>
            <Link href={routesUrl.about}>
              <Button
                className="hover:text-red-700"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Recently added
              </Button>
            </Link>
            <Box
              onClick={handleOpenCart}
              sx={{ display: "flex", alignItems: "center", }}
            >
              {/* <Badge badgeContent={count} color="error"> */}
              My List
              {/* </Badge> */}
            </Box>
          </Box>
          <FormInput
            control={control}
            name="search"
            placeholder="Search Movie Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You need to log in to access the cart.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleConfirmDialog} autoFocus>
                Log In
              </Button>
            </DialogActions>
          </Dialog>
          {session ? (
            <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
              <Typography
                className="signin-button"
                sx={{ textAlign: "center" }}
              >
                <LogoutButton />
              </Typography>
            </Box>
          ) : (
            <Link href={routesUrl.signIn}>
              <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
                <Typography className="signin-button" color="white">
                  Sign In
                </Typography>
              </Box>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
