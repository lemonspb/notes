import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Confirm from "../pages/Confirm";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />

      <Route path="/main" element={<PrivateRoute component={Main} />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/confirm/:id" element={<Confirm />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
