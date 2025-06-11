import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgotPassword";
import OtpVerification from "../pages/otpVerification";
import ResetPassword from "../pages/resetPassword";
import Home from "../pages/home";
import BlogCards from "../pages/blogCards";
import AddBlog from "../components/AddBlog";
import BlogList from "../components/BlogList";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "./routesName";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={ROUTES.login}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.forgotPassword}
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.otpVerification}
        element={
          <PublicRoute>
            <OtpVerification />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.home}
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/blog-cards"
        element={
          <PrivateRoute>
            <BlogCards />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-blog"
        element={
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/blog-list"
        element={
          <PrivateRoute>
            <BlogList />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
