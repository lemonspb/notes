import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../../slices/auth";
import { useAppDispatch } from "../../../hooks";
import styles from "./LoginForm.module.scss";

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
    const { payload } = await dispatch(login(data));
    if (payload && payload.token) {
      navigate("/main");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

      {errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
