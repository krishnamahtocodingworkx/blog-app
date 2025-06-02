import vectorImg from "../assets/images/Vector.png";
import { Typography } from "@mui/material";
const DiveBuddiesHead: React.FC = () => {
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
        <img width="50" src={vectorImg} alt="vectorImg" />
        DiveBuddies
      </Typography>
    </>
  );
};

export default DiveBuddiesHead;
