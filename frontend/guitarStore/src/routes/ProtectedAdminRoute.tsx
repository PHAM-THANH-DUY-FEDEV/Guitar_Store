import { Navigate, Outlet } from "react-router-dom";
import { useAuthAdmin } from "../authAdminProvider";

const ProtectedAdminRoute = () => {
  const { tokenAdmin } = useAuthAdmin();

  if (!tokenAdmin) {
    return <Navigate to="/login/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
