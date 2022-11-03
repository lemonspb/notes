import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<div>логин</div>} />

      <Route path="/main" element={<div>главная</div>} />
    </Routes>
  );
};

export default AppRouter;
