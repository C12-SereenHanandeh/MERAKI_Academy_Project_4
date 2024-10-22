import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role, allowedRoles }) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />; 
  }
  return children; 
  
};

export default ProtectedRoute;
