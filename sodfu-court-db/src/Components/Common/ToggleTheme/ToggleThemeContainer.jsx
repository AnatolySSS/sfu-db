import { connect } from "react-redux";
import ToggleTheme from "./ToggleTheme";
import { setTheme } from "../../../redux/reducers/auth-reducer";

let mapStateToProps = (state) => {
  return {
    theme: state.auth.theme,
  };
};

let mapDispatchToProps =  {
  setTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleTheme)