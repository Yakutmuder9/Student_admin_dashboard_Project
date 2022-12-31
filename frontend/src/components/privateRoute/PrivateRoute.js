import { Navigate, Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../pages/auth/customHook/useRedirectLoggedOutUser";

const PrivateRoute = () => {
  // useRedirectLoggedOutUser('/login')

  const logginStatus = useSelector((state) => state.auth);
  const { isLoggedIn } = logginStatus

  return (
    isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace={true} />
    )
  );
};

export default PrivateRoute;