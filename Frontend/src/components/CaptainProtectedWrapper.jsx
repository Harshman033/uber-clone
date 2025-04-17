import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CaptainAuthContext } from "../context/CaptainAuthContext";

function CaptainProtectedRoute({ children }) {
  const {authenticated, loading} = useContext(CaptainAuthContext);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) return <Navigate to="/captain-login" />;

  return children;
}

export default CaptainProtectedRoute;