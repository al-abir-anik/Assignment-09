import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const SecureRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return children;
  }

  return <Navigate to={"/"}></Navigate>;
};

export default SecureRoute;
