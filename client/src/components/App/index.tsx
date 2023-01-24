import AppRouter from "@/router/AppRouter";
import styles from "./App.module.scss";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className={styles.app}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
