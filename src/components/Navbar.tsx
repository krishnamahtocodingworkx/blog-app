import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../assets/images/logo.jpg";
import dp from "../assets/images/dp.jpg";
import { Link } from "react-router-dom";

const user = {
  name: "Mukul Karnwal",
  photo: { dp },
};

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        "& .MuiToolbar-root": {
          bgcolor: "rgba(255, 255, 255, 1)",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img width="50" src={logo} alt="logo" />
          Blog Book
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 3 }}>
          <Typography
            component={Link}
            to="/home"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontWeight: 500,
              mx: 1,
              "&:hover": { color: "primary.main" },
            }}
          >
            Home
          </Typography>
          <Typography
            component={Link}
            to="/about"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontWeight: 500,
              mx: 1,
              "&:hover": { color: "primary.main" },
            }}
          >
            About
          </Typography>
          <Typography
            component={Link}
            to="/contact"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontWeight: 500,
              mx: 1,
              "&:hover": { color: "primary.main" },
            }}
          >
            Contact
          </Typography>
          <Typography
            component={Link}
            to="/blogs"
            sx={{
              textDecoration: "none",
              color: "text.primary",
              fontWeight: 500,
              mx: 1,
              "&:hover": { color: "primary.main" },
            }}
          >
            Blogs
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <Typography variant="body1" color="textPrimary">
              Notification
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleMenuOpen}
          >
            <Avatar
              src={user.photo.dp}
              alt={user.name}
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Typography variant="body1" color="textPrimary" sx={{ mr: 0.5 }}>
              {user.name}
            </Typography>
            <ArrowDropDownIcon />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
