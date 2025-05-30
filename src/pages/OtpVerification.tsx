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

interface OtpVerificationProps {
  email: string;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email }) => {
  const [otp, setOtp] = React.useState("");

  const handleChange = (newValue: string): void => {
    setOtp(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted OTP:", otp);
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
          <Typography variant="body1" gutterBottom align="left">
            <strong>{email}</strong>.
          </Typography>
          <Divider />

          <form onSubmit={handleSubmit} className="form-field-container">
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
