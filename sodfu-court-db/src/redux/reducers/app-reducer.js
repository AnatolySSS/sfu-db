import { getAuthUserData } from "./auth-reducer";
import { getTotalRecords } from "./court-docs-reducer";
import { getTotalNewRecords } from "./new-tasks-reducer";
import { getUsers } from "./users-reducer";
import { getValues } from "./values-reducer";
const SET_INITIALIZED = "sodfu-court-db/appReducer/SET_INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => {
  return {
    type: SET_INITIALIZED,
  };
};

export const initializeApp = () => {
  return async (dispatch) => {
    await dispatch(getAuthUserData())
    await dispatch(getUsers())
    await dispatch(getTotalNewRecords())
    await dispatch(getTotalRecords())
    await dispatch(getValues())
    dispatch(initializedSuccess())
  };
};

export default appReducer;
