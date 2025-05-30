import * as React from "react";
import {
  CssBaseline,
  Container,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import "../index.css";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = () => {
    console.log("Logging in with", { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="form-container">
          <Avatar
            sx={{
              ml: "50%",
              mb: "10%",
            }}
          >
            <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom align="center">
            Sign In to your account
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

            <div className="form-field">
              <Typography variant="subtitle1" gutterBottom>
                Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
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
              <Link href="/forgotPassword" underline="hover" variant="body2">
                Forgot password?
              </Link>
              <Button
                type="submit"
                variant="contained"
                style={{ float: "inline-end" }}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Login;
