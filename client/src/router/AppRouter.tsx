import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/main" element={<PrivateRoute component={Main} />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
