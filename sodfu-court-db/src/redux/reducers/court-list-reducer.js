import { CourtListDataAPI } from "../../api/api";
import { columns, filters } from "../../Components/Main/Tables/Courts/service/CourtsListData";

const SET_DATA = "sodfu-court-db/court-list-reducer/SET_DATA";
const SET_VISIBLE_COLUMNS = "sodfu-court-db/court-list-reducer/SET_VISIBLE_COLUMNS";
const TOGGLE_IS_FETCHING = "sodfu-court-db/court-list-reducer/TOGGLE_IS_FETCHING";

//TODO: columns и data должны быть []

let initialState = {
  columns: columns,
  visibleColumns: columns,
  courts: [],
  totalRecords: 0,
  filters: filters,
  values: [],
  isFetching: false,
};

const courtListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        courts: action.data.courts,
        totalRecords: action.data.count,
        values: { ...action.data.values },
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_VISIBLE_COLUMNS:
      return {
        ...state,
        visibleColumns: action.visibleColumns,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
export const saveVisibleColumns = (visibleColumns) => ({ type: SET_VISIBLE_COLUMNS, visibleColumns });

export const requestData = (lazyState) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await CourtListDataAPI.getData(lazyState)
    dispatch(toggleIsFetching(false));
    dispatch(setData(data));
  };
};

export const updateData = (lazyState, rowData, employer) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await CourtListDataAPI.updateData(rowData, employer);
    const data = await CourtListDataAPI.getData(lazyState);
    dispatch(toggleIsFetching(false));
    dispatch(setData(data));
  };
};

export default courtListReducer;
