import { AuthAPI } from "../../api/api";
import { ThemeAPI } from "../../api/api";
const SET_AUTH = "sodfu-court-db/authReducer/IS_AUTH";
const SET_THEME = "correspondance/theme-reducer/SET_THEME";
const SET_MESSAGE = "sodfu-court-db/authReducer/SET_MESSAGE";

let initialState = {
  login: "",
  fullName: "",
  isAuth: false,
  role: "",
  theme: "light",
  message: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        ...action.data,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case SET_MESSAGE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

const setAuth = (login, fullName, isAuth, role, theme, message) => ({ type: SET_AUTH, data: {login, fullName, isAuth, role, theme, message} });
export const setTheme = (theme) => ({ type: SET_THEME, theme: theme });
const setMessage = (message) => ({ type: SET_MESSAGE, data: {message} })

export const getAuthUserData = () => {
  return async (dispatch) => {
    const data = await AuthAPI.me();
    switch (data.resultCode) {
      case 0:
        let { login, full_name, role, theme } = data.user;
        dispatch(setAuth(login, full_name, true, role, theme, data.message));
        break;
      case 1:
        dispatch(setMessage(data.message));
        break;
      default:
        dispatch(setMessage(data.message));
        break;
    }
  };
};

export const login = (login, password) => (dispatch) => {
  AuthAPI.login(login, password).then((data) => {
    switch (data.resultCode) {
      case 0:
        localStorage.setItem('accessToken', data.accessToken)
        dispatch(getAuthUserData());
        break;
      case 1:
        dispatch(setMessage(data.message));
        break;
      case 2:
        dispatch(setMessage(data.message));
        break;
      default:
        break;
    }
  });
};

export const logout = () => (dispatch) => {
  AuthAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuth(null, null, false, null));
      localStorage.removeItem('accessToken')
    }
  });
};

export const updateTheme = (theme) => async (dispatch) => {
  const data = await ThemeAPI.updateTheme(theme);
  dispatch(setTheme(theme));
  switch (data.resultCode) {
    case 0:
      dispatch(setTheme(theme));
      break;
    default:
      break;
  }
};

export default authReducer;
