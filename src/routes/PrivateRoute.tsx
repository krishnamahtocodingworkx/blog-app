import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem("authToken");
  console.log("is authenticated :", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
