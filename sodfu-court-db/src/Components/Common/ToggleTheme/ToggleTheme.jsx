import { classNames } from "primereact/utils";
import styles from "./ToggleTheme.module.css";
import { InputSwitch } from "primereact/inputswitch";

const ToggleTheme = (props) => {
  const {theme, setTheme} = props

  const changeTheme = (value) => {
    let themeLink = document.getElementById("app-theme");
    setTheme(value ? "dark" : "light")
    if (themeLink) {
      if (value) {
        themeLink.setAttribute("href", "/themes/mdc-dark-indigo/theme.css");
      } else {
        themeLink.setAttribute("href", "/themes/mdc-light-indigo/theme.css");
      }
    }
  };

  return (
    <div className={styles.toggle}>
      <span
        className={classNames("pi pi-sun mr-3", styles.sun)}
        onClick={() => changeTheme(false)}
      />
      <InputSwitch checked={theme === 'dark' ? true : false} onChange={(e) => changeTheme(e.value)} />
      <span
        className={classNames("pi pi-moon ml-3", styles.moon)}
        onClick={() => changeTheme(true)}
      />
    </div>
  );
  
};

export default ToggleTheme;
