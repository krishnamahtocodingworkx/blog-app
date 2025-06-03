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
import logo from "../assets/images/logo.png";

const user = {
  name: "Mukul Karnwal",
  photo: "",
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
            gap: "10px",
          }}
        >
          <img width="50" src={logo} alt="logo" />
          DiveBuddies
        </Typography>

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
              src={user.photo}
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
