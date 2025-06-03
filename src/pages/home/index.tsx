import React from "react";
import Title from "../../components/Title";
import { Typography } from "@mui/material";
import bgImage1 from "../../assets/images/bg-1.jpg";

const Home: React.FC = () => {
  return (
    <div>
      <Title />
      <Typography
        variant="h4"
        align="center"
        style={{
          fontWeight: "bold",
        }}
      >
        Welcome to our blog
        <img width="1200" src={bgImage1} alt="logo" />
      </Typography>
    </div>
  );
};

export default Home;
