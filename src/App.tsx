import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import OtpVerification from "./pages/otpVerification";
import ResetPassword from "./pages/resetPassword";
import React from "react";

const App: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/forgotPassword"
            element={<ForgotPassword setEmail={setEmail} />}
          ></Route>
          <Route
            path="/otpVerification"
            element={<OtpVerification email={email} />}
          ></Route>
          <Route path="/resetPassword" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
