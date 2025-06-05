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
import { Link } from "react-router-dom";

const menuItems = [
  { icon: <ListAltIcon />, text: "BlogList", path: "/blog-list" },
  { icon: <ViewModuleIcon />, text: "BlogCards", path: "/blog-cards" },
  { icon: <AddBoxIcon />, text: "AddBlog", path: "/add-blog" },
];

const Menu: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 220,
        minHeight: "100vh",
        bgcolor: "rgba(255, 255, 255, 1)",
        borderRight: `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        py: 2,
      }}
    >
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Menu;
