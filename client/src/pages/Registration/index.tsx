import RegistrationForm from "../../components/Forms/RegistrationForm";
import styles from "./Registration.module.scss";
function Registration() {
  return (
    <div className={styles.container}>
      <RegistrationForm />
    </div>
  );
}

export default Registration;
