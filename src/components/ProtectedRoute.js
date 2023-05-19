import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({
  isLoggedIn,
  element: Component,
  ...props
}) => {
  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace={true} />
  );
};

export default ProtectedRouteElement;
