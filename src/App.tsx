import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route
            path="/otpVerification"
            element={<OtpVerification email="xyz@gmail.com" />}
          ></Route>
          <Route path="/resetPassword" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
