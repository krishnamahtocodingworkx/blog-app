import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const menuItems = [
  { icon: <ListAltIcon />, text: "BlogList", path: "/blog-list" },
  { icon: <ViewModuleIcon />, text: "BlogCards", path: "/blog-cards" },
  { icon: <AddBoxIcon />, text: "AddBlog", path: "/add-blog" },
];

const Menu: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const menuContent = (
    <Box
      sx={{
        mt: { xs: "56px", sm: "20px" },
        ml: { xs: "56px", sm: "20px" },
        width: 220,
        height: "100vh",
        bgcolor: "rgba(255, 255, 255, 1)",
        display: "flex",
        flexDirection: "column",
        py: 2,
        px: 2,
        boxSizing: "border-box",
      }}
      role="presentation"
      onClick={isMobile ? () => setDrawerOpen(false) : undefined}
    >
      {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src={logo} alt="logo" width={60} />
        </Box>
      )}
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive ? theme.palette.primary.main : "inherit",
                color: isActive ? "#fff" : "inherit",
                "& .MuiListItemIcon-root": {
                  color: isActive ? "#fff" : theme.palette.text.primary,
                },
                "& .MuiListItemText-primary": {
                  fontWeight: isActive ? 700 : 400,
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: isActive ? "6px" : "none",
                },
                "&:hover": {
                  bgcolor: theme.palette.primary.main,
                  color: "#fff",
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                  "& .MuiListItemText-primary": {
                    textDecoration: "underline",
                    textUnderlineOffset: "6px",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ m: 1, position: "fixed", top: 10, left: 10 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 220,
              },
            }}
          >
            {menuContent}
          </Drawer>
        </>
      ) : (
        menuContent
      )}
    </>
  );
};

export default Menu;
