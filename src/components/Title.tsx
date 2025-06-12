import logo from "../assets/images/logo.jpg";
import { Typography, Box } from "@mui/material";

const Title: React.FC = () => {
  return (
    <>
      {/* DiveBuddies image and heading */}
      <Typography
        variant="h5"
        gutterBottom
        align="left"
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          mb: 2.5,
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        Blog Book
      </Typography>
    </>
  );
};

export default Title;
