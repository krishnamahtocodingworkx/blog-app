import React, { ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { ROUTES } from "./routesName";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();
  if (
    !location.state?.fromUI &&
    location.pathname !== ROUTES.login &&
    location.pathname !== ROUTES.resetPassword
  ) {
    return <Navigate to={ROUTES.login} replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
