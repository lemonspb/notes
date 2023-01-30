import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../../slices/auth";
import { useAppDispatch } from "../../../hooks";
import styles from "./LoginForm.module.scss";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await dispatch(login(data)).unwrap();
    if (response?.token) {
      navigate("/main");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h3>Авторизация</h3>
      <div className={styles.inputField}>
        <label className={styles.label} htmlFor="">
          Email
        </label>
        <input
          type={"email"}
          placeholder="Введите email"
          className={styles.input}
          {...register("email", { required: true })}
        />
      </div>

      <div className={styles.inputField}>
        <label className={styles.label} htmlFor="">
          Пароль
        </label>
        <input
          type={"password"}
          placeholder="Введите пароль"
          className={styles.input}
          {...register("password", { required: true })}
        />
      </div>

      {errors.password && (
        <span className={styles.errors}>Обязательные поля</span>
      )}
      <div className={styles.link}>
        <Link to="/register">Зарегистроваться</Link>
      </div>
      <button type="submit" className={styles.btn}>
        Отправить
      </button>
    </form>
  );
}
