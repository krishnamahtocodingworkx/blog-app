import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../assets/images/logo.jpg";
import dp from "../assets/images/dp.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { RootState } from "../redux/store";
import { loginApiServices } from "../services/AxiosClient";

const user = {
  name: "Mukul Karnwal",
  photo: { dp },
};

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement | SVGSVGElement>
  ) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await loginApiServices.post(
        "/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout API response:", response.data);
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      dispatch(logout());
      localStorage.clear();
      handleMenuClose();
      navigate("/");
    }
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      // elevation={0}
      sx={{
        "& .MuiToolbar-root": {
          bgcolor: "rgba(255, 255, 255, 1)",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 },
        }}
      >
        {/* Logo and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img width="40" src={logo} alt="logo" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              letterSpacing: 1,
            }}
          >
            Blog Book
          </Typography>
        </Box>

        {/* Profile/Avatar Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src={user.photo.dp}
            alt={user.name}
            sx={{
              width: { xs: 28, sm: 32, md: 36 },
              height: { xs: 28, sm: 32, md: 36 },
              mr: { xs: 0, sm: 1 },
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
          />
          <Typography
            variant="body1"
            color="textPrimary"
            sx={{
              display: { xs: "none", sm: "block" },
              mr: 0.5,
              fontSize: { sm: "1rem", md: "1.1rem" },
            }}
          >
            {user.name}
          </Typography>
          <ArrowDropDownIcon
            sx={{ cursor: "pointer" }}
            onClick={handleMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
