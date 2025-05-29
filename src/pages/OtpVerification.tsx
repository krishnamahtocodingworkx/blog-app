import * as React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  CssBaseline,
  Container,
  Button,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import "../index.css";

const OtpVerification = () => {
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue: string): void => {
    setOtp(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="form-container">
          <Typography variant="h5" gutterBottom align="left">
            OTP Verification
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            We have sent a code to
          </Typography>
          <Divider />

          <form className="form-field-container">
            <MuiOtpInput value={otp} onChange={handleChange} />
            <div className="form-field" style={{ textAlign: "left" }}>
              <Link href="/OtpVerification" underline="hover" variant="body2">
                Resend OTP
              </Link>
              <Button
                type="submit"
                variant="contained"
                style={{ float: "inline-end" }}
              >
                Verify
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default OtpVerification;
