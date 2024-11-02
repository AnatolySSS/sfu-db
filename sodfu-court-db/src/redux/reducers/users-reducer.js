import { UsersAPI } from "../../api/api";
const SET_USERS = "sodfu-court-db/users-reducer/SET_USERS";

let initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    default:
      return state;
  }
};

const setUsers = (users) => ({ type: SET_USERS, users });

export const getUsers = () => {
  return async (dispatch) => {
    const data = await UsersAPI.getUsers();
    switch (data.resultCode) {
      case 0:
        dispatch(setUsers(data.users));
        break;
      default:
        break;
    }
  };
};

export default usersReducer;
