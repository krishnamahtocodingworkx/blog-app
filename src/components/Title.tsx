import logo from "../assets/images/logo.png";
import { Typography } from "@mui/material";
const Title: React.FC = () => {
  return (
    <>
      {/* DiveBuddies image and heading  */}
      <Typography
        variant="h5"
        gutterBottom
        align="left"
        style={{
          fontWeight: "bold",
          // border: "1px solid black",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <img width="50" src={logo} alt="logo" />
        DiveBuddies
      </Typography>
    </>
  );
};

export default Title;
