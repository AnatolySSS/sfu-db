import styles from "./Login.module.css";
import { Image } from 'primereact/image';
import LoginForm from "./LoginfForm/LoginForm";
import 'primeicons/primeicons.css';
import ToggleThemeContainer from "../Common/ToggleTheme/ToggleThemeContainer";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const { isAuth } = props;

  if (isAuth) return <Navigate to={"/main/statistics"} />
  
  return (
    <div className={styles.container}>
      {/* <div className="absolute top-0 right-0 mt-3 mr-3">
        <ToggleThemeContainer />
      </div> */}
      <Image
        src={require("../../img/logo-big.png")}
        className="mb-3"
        width="100"
        alt="finombudsman"
      />
      <LoginForm {...props}/>
    </div>
  );

};

export default Login;
