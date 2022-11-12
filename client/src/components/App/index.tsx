import AppRouter from "@/router/AppRouter";
import styles from "./App.module.scss";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
