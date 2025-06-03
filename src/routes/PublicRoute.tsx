import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = sessionStorage.getItem("authToken");
  return !isAuthenticated ? children : <Navigate to="/home" />;
};

export default PublicRoute;
