import React from "react";
import { useState } from "react";
import "/node_modules/primeflex/primeflex.css";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Image } from 'primereact/image';
import { InputSwitch } from 'primereact/inputswitch';

const LoginSchema = Yup.object({
  login: Yup.string()
    .min(6, "Мало символов")
    .max(30, "Много символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(3, "Мало символов")
    .max(30, "Много символов")
    .required("Обязательное поле"),
});

const LoginForm = (props: Object): JSX.Element => {

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
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
            name="login"
            type="text"
            aria-describedby="login-help"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          <label htmlFor="login">Имя пользователя</label>
        </span>
        <small id="login-help" className="text-right" style={{color: 'var(--red-600)'}}>
          {formik.touched.login as boolean && formik.errors.login as string
            ? formik.errors.login as string
            : null}
        </small>
      </div>

      <div className="flex flex-column mb-1 gap-1">
        <span className="p-float-label">
          <Password
            id="password"
            name="password"
            type="password"
            aria-describedby="password-help"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label htmlFor="password">Пароль</label>
        </span>
        <small id="login-help" className="text-right" style={{color: 'var(--red-600)'}}>
          {formik.touched.password as boolean && formik.errors.password as string
            ? formik.errors.password as string
            : null}
        </small>
      </div>

      <Button type="submit" className="w-full justify-content-center">
        ВОЙТИ
      </Button>
    </form>
  );
};



const Login = (props: Object) => {
  const [checked, setChecked] = useState(false);

  const changeTheme = (value: any) => {
    let themeLink = document.getElementById('app-theme');
    if (themeLink) {
      if (value) {
        setChecked(true)
        themeLink.setAttribute('href', '/themes/mdc-dark-indigo/theme.css');
      } else {
        setChecked(false)
        themeLink.setAttribute('href', '/themes/mdc-light-indigo/theme.css');
      }
      
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
            <InputSwitch checked={checked} onChange={(e) => changeTheme(e.value)} />
        </div>
      <Image src={require("../../img/logo-big.png")} className="mb-3" width="100" alt="fin ombudsman"/>
      <LoginForm />
    </div>
  );
};

export default Login;
