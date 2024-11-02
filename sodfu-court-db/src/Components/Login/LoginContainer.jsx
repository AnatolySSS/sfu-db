import { connect } from "react-redux";
import Login from "./Login";
import { login } from "../../redux/reducers/auth-reducer";

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    fullName: state.auth.fullName,
    message: state.auth.message
  };
};

let mapDispatchToProps =  {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)