import bgImage from "../assets/images/bg.jpg";
import { Button, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Tutorial: React.FC = () => {
  return (
    <>
      {/* ***************************left-container start**********************  */}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          padding: "20px",
          margin: "50px",
        }}
      >
        {/* *************************diving-activities heading start**********************************  */}
        <Box
          sx={{
            position: "absolute",
            borderRadius: "0 16px 16px 16px",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              border: "1px solid rgb(203, 199, 199)",
              borderRadius: "16px",
              margin: "10px",
              padding: "10px 30px",
              fontSize: "16px",
            }}
          >
            Diving Activities
          </Typography>
        </Box>
        {/* ****************************diving-activities heading end*************************************  */}

        {/* ********************backgroundImage start*************************  */}
        <Box component="img" width="100%" src={bgImage} alt="bgImage" />
        {/* ********************backgroundImage end*************************  */}

        {/* headingOfBgImage start */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            position: "absolute",
            bottom: "20%",
            display: "flex",
            color: "#fff",
            margin: "16px",
          }}
        >
          Ocean Adventures Await-Dive In!
        </Typography>
        {/*  headingOfBgImage end */}

        {/* *********************************back-btn start******************************  */}
        <Box
          sx={{
            border: "1px solid rgb(203, 199, 199)",
            position: "absolute",
            bottom: "30px",
            left: "10px",
            padding: "10px",
            margin: "10px 10px 0 0",
            borderRadius: "18px 18px 18px 0",
            backgroundColor: "#fff",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "black",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Box>
        {/* *********************************back-btn end******************************  */}

        {/* *********************************forward-btn start***********************************  */}
        <Box
          sx={{
            border: "1px solid rgb(203, 199, 199)",
            position: "absolute",
            bottom: "18px",
            right: "18px",
            margin: "10px",
            padding: "10px",
            borderRadius: "18px 18px 0 18px",
            backgroundColor: "#fff",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "10px",
              padding: "8px 30px",
            }}
          >
            <ArrowForwardIcon />
          </Button>
        </Box>
        {/* *********************************forward-btn end***********************************  */}
      </Box>
      {/* ***************************left-container end**********************  */}
    </>
  );
};
export default Tutorial;
