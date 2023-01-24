import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registration } from "../../../slices/auth";
import { useAppDispatch } from "../../../hooks";
import styles from "./RegistrationForm.module.scss";

type Inputs = {
  email: string;
  password: string;
};

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await dispatch(registration(data)).unwrap();
    if (response?.userId) {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h3>Регистрация</h3>
      <div className={styles.inputField}>
        <label className={styles.label} htmlFor="">
          Email
        </label>
        <input
          className={styles.input}
          {...register("email", { required: true })}
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label} htmlFor="">
          Пароль
        </label>
        <input
          className={styles.input}
          {...register("password", { required: true })}
        />
      </div>
      {errors.password && (
        <span className={styles.errors}>This field is required</span>
      )}
      <button type="submit" className={styles.btn}>
        Отправить
      </button>
    </form>
  );
}
