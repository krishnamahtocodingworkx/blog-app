import * as React from "react";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import "../index.css";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const handleSubmit = () => {
    console.log("Logging in with", { email });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="form-container">
          <Typography variant="h5" gutterBottom align="left">
            Forgot Password?
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            <Link href="/resetPassword" underline="hover" variant="body2">
              You can reset your password here
            </Link>
          </Typography>
          <Divider />

          <form onSubmit={handleSubmit} className="form-field-container">
            <div className="form-field">
              <Typography variant="subtitle1" gutterBottom>
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter email address"
                variant="outlined"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-field" style={{ textAlign: "left" }}>
              <Link href="/" underline="hover" variant="body2">
                <KeyboardArrowLeftIcon />
                Back to Log in
              </Link>
              <Button
                onClick={() => {
                  navigate("/otpVerification");
                }}
                type="submit"
                variant="contained"
                style={{ float: "inline-end" }}
              >
                Send OTP
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ForgotPassword;
