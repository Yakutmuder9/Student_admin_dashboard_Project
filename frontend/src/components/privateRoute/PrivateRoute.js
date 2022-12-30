import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/feature/auth/authSlice";
import { SET_LOGIN } from "../../redux/feature/auth/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(SET_LOGIN);
  }, [isLoggedIn, dispatch]);
 
  return (

    isLoggedIn ? (
      <Outlet />
    ) : (

      <Navigate to="/login" replace={true} />

    )

  );
};

export default PrivateRoute;