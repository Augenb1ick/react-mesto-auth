import { useForm } from "react-hook-form";

function Login(props) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  function onSubmit(data) {
    props.onSubmit(data);
  }

  return (
    <section className="entry-page">
      <h1 className="entry-page__title">Вход</h1>
      <form
        className="entry-page__form"
        name="entry-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email", {
            required: { value: true, message: "Это поле нужно заполнить" },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Пожалуйста, укажите корректный электронный адрес",
            },
          })}
          className="entry-page__input"
          type="email"
          placeholder="Email"
          name="email"
        />
        <span className="entry-page__input-error">
          {errors?.email?.message}
        </span>
        <input
          {...register("password", {
            required: "Это поле нужно заполнить",
            minLength: {
              value: 6,
              message: "Пароль должен состоять как минимум из 6 символов",
            },
          })}
          className="entry-page__input"
          type="password"
          placeholder="Пароль"
          name="password"
        />
        <span className="entry-page__input-error">
          {errors?.password?.message}
        </span>
        <button
          className={`entry-page__button ${
            !isValid ? "entry-page__button_disabled" : ""
          }`}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
