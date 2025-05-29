import * as React from "react";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../index.css";

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = () => {
    console.log("Confirm password", { password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="form-container">
          <Typography variant="h5" gutterBottom align="left">
            Reset Password
          </Typography>
          <Typography variant="p" gutterBottom align="left">
            Enter the new password to secure your account
          </Typography>
          <Divider />

          <form onSubmit={handleSubmit} className="form-field-container">
            <div className="form-field">
              <Typography variant="subtitle1" gutterBottom>
                New Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                variant="outlined"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-field">
              <Typography variant="subtitle1" gutterBottom>
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                variant="outlined"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="form-field" style={{ textAlign: "left" }}>
              <Button
                type="submit"
                variant="contained"
                style={{ float: "inline-end" }}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Login;
