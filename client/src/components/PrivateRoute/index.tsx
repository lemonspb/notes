import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";

type PrivateRoute = {
  component: React.FC;
};

const PrivateRoute = ({ component: Component }: PrivateRoute) => {
  const { token } = useAppSelector((state) => state.auth);
  if (token) {
    return <Component />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
