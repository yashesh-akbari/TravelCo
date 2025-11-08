import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAdmin = localStorage.getItem("adminLogged") === "yes";
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}
