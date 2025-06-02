import divingActivities from "../pages/bg/DivingActivities.jpg";
import { Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LeftContainer: React.FC = () => {
  return (
    <>
      {/* ***************************left-container start**********************  */}
      <div
        style={{
          // border: "1px solid black",
          display: "flex",
          position: "relative",
          padding: "20px",
          margin: "50px",
        }}
      >
        {/* *************************diving-activities heading start**********************************  */}
        <div
          style={{
            // border: "1px solid rgb(203, 199, 199)",
            position: "absolute",
            borderRadius: "0 16px 16px 16px",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              border: "1px solid rgb(203, 199, 199)",
              borderRadius: "16px",
              margin: "10px",
              padding: "10px 30px",
              fontSize: "16px",
            }}
          >
            Diving Activities
          </Typography>
        </div>
        {/* ****************************diving-activities heading end*************************************  */}

        {/* ********************diving-activitiesImage start*************************  */}
        <img
          width="100%"
          src={divingActivities}
          alt="divingActivitiesImg"
          // style={{ borderTopRightRadius: "5%" }}
        />
        {/* ********************diving-activitiesImage end*************************  */}
        {/* Dive-in heading start */}
        <Typography
          variant="h4"
          gutterBottom
          style={{
            position: "absolute",
            bottom: "20%",
            display: "flex",
            color: "#fff",
            margin: "16px",
            // border: "1px solid #fff",
          }}
        >
          Ocean Adventures Await-Dive In!
        </Typography>
        {/* Dive-in heading end */}

        {/* *********************************back-btn start******************************  */}
        <div
          style={{
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
            style={{
              // border: "1px solid black",
              backgroundColor: "#fff",
              color: "black",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <ArrowBackIcon />
          </Button>
        </div>
        {/* *********************************back-btn end******************************  */}

        {/* *********************************forward-btn start***********************************  */}
        <div
          style={{
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
            style={{
              borderRadius: "10px",
              padding: "8px 30px",
            }}
          >
            <ArrowForwardIcon />
          </Button>
        </div>
        {/* *********************************forward-btn end***********************************  */}
      </div>
      {/* ***************************left-container end**********************  */}
    </>
  );
};
export default LeftContainer;
