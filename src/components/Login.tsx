import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, TextField, Typography } from "@mui/material";
import "../index.css";

export default function Login() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="form-container">
          <Typography variant="h5" gutterBottom component="h1" align="center">
            Sign In to your account
          </Typography>
          <hr />
          <hr />

          <div className="form-field-container">
            <div className="form-field">
              <TextField
                id="outlined-basic"
                label="Enter email address"
                variant="outlined"
              />
            </div>
            <div className="form-field">
              <TextField
                id="outlined-basic"
                label="Enter Password"
                variant="outlined"
              />
            </div>
            <Button variant="contained">Login</Button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
