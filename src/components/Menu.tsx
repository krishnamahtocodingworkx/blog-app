import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PlaceIcon from "@mui/icons-material/Place";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

const menuItems = [
  { icon: <DashboardIcon />, text: "Dashboard" },
  { icon: <PeopleIcon />, text: "Users" },
  { icon: <PlaceIcon />, text: "Sites" },
  { icon: <LocationCityIcon />, text: "Cities" },
  { icon: <SettingsIcon />, text: "Settings" },
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
