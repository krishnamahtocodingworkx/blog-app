import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import OtpVerification from "./pages/otpVerification";
import ResetPassword from "./pages/resetPassword";
import React from "react";
import Home from "./pages/home";
import Blogs from "./pages/blogs/Blogs";

const App: React.FC = () => {
  const [email] = React.useState<string>("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/otp-verification"
            element={<OtpVerification email={email} />}
          ></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
