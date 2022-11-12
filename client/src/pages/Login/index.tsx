import LoginForm from "../../components/Forms/LoginForm";
import styles from "./Login.module.scss";
function Login() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

export default Login;
