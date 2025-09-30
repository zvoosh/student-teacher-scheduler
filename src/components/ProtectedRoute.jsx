import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem("logedInUser");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export { ProtectedRoute };
