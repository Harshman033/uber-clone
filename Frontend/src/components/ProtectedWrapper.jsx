import { Navigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";

function ProtectedRoute({ children }) {
  const {authenticated, loading} = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) return <Navigate to="/user-login" />;

  return children;
}

export default ProtectedRoute;