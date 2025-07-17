import React from "react";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "admin" expected

  if (!token || userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateAdminRoute;
