import { useFormik } from "formik";
import * as Yup from 'yup';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const LoginSchema = Yup.object({
  login: Yup.string()
    .min(3, "Мало символов")
    .max(20, "Много символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(3, "Мало символов")
    .max(20, "Много символов")
    .required("Обязательное поле"),
});

const LoginForm = (props) => {
  const { login } = props;

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values.login, values.password);
    },
  });

  return (
    <form
      className="flex flex-column align-items-center justify-content-center"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-column mb-1 gap-1">
        <span className="p-float-label">
          <InputText
            id="login"
            aria-describedby="login-help"
            {...formik.getFieldProps('login')}
          />
          <label htmlFor="login">Имя пользователя</label>
        </span>
        <small id="login-help" className="text-right" style={{color: 'var(--red-700)'}}>
          {formik.touched.login && formik.errors.login
            ? formik.errors.login
            : null}
        </small>
      </div>

      <div className="flex flex-column mb-1 gap-1">
        <span className="p-float-label">
          <Password
            id="password"
            aria-describedby="password-help"
            {...formik.getFieldProps('password')}
          />
          <label htmlFor="password">Пароль</label>
        </span>
        <small id="login-help" className="text-right" style={{color: 'var(--red-700)'}}>
          {formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null}
        </small>
      </div>

      <Button type="submit" className="w-full justify-content-center">
        ВОЙТИ
      </Button>
    </form>
  );
};

export default LoginForm;
