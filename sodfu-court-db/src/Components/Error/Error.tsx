import { useRouteError } from "react-router-dom";
import styles from './Error.module.css'
import ToggleTheme from "../Common/ToggleTheme/ToggleTheme";

const Error = (props: Object): JSX.Element => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-column align-items-center justify-content-center h-screen">
      <ToggleTheme />
      <span className={styles.errorStatus}>{error.status}</span>
      <p>
        <b>{error.statusText}:</b> <i className={styles.underline}>{error.error.message}</i>
      </p>
    </div>
  );
}

export default Error;