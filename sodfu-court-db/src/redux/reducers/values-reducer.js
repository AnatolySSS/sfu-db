import { ValuesAPI } from "../../api/api";
const SET_VALUES = "sodfu-court-db/values-reducer/SET_VALUES";

let initialState = {
  values: [],
};

const valuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VALUES:
      return {
        ...state,
        values: {...action.values},
      };
    default:
      return state;
  }
};

const setValues = (values) => ({ type: SET_VALUES, values });

export const getValues = () => {
  return async (dispatch) => {
    const data = await ValuesAPI.getValues();
    switch (data.resultCode) {
      case 0:
        dispatch(setValues(data.values));
        break;
      default:
        break;
    }
  };
};

export default valuesReducer;
