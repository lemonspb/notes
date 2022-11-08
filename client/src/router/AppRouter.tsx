import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />

      <Route path="/login" element={<div>главная</div>} />
    </Routes>
  );
};

export default AppRouter;
