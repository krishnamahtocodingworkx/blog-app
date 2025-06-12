import React from "react";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import { Box, Typography } from "@mui/material";
import { STRING } from "../../utils/string";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: "rgba(239, 239, 239, 1)",
          minHeight: "100vh",
          mt: { xs: "56px", sm: "64px" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            minHeight: "100%",
            position: "sticky",
            top: { xs: "56px", sm: "64px" },
          }}
        >
          <Menu />
        </Box>
        <Box sx={{ flex: 1, px: 3, py: 4, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            {STRING.homeWelcome}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Home;
