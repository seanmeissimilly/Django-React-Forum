import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  //Reviso si userInfo no está vacio para saber si hay algún usuario logueado.
  return !isEmpty(userInfo) ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
