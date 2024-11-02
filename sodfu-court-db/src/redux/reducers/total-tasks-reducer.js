import { TotalTasksDataAPI } from "../../api/api";
import { columns, filters, values } from "../../Components/Main/Tasks/service/TasksData";

const SET_DATA = "sodfu-court-db/total-tasks-reducer/SET_DATA";
const SET_VISIBLE_COLUMNS = "sodfu-court-db/total-tasks-reducer/SET_VISIBLE_COLUMNS";
const TOGGLE_IS_FETCHING = "sodfu-court-db/total-tasks-reducer/TOGGLE_IS_FETCHING";

//TODO: columns и data должны быть []
let initialState = {
  columns: columns,
  visibleColumns: columns,
  data: [],
  totalRecords: 0,
  filters: filters,
  values: values,
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
  validationStatus: {}
};

const totalTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: state.columns,
        data: action.data.totalDocs,
        totalRecords: action.data.totalCount,
        values: action.data.values,
        filters: {...state.filters},
        // name: action.data.name,
        // message: action.message,
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

export const requestData = (data) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    TotalTasksDataAPI.getData(data).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setData(data));
    });
  };
};

export const updateData = (data, rowData, rowId) => {
  return (dispatch) => {
    TotalTasksDataAPI.updateData(rowData, rowId).then((message) => {
      TotalTasksDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export const deleteData = (data, rowId) => {
  return (dispatch) => {
    TotalTasksDataAPI.deleteData(rowId).then((message) => {
      TotalTasksDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export const addData = (data, rowData) => {
  return (dispatch) => {
    TotalTasksDataAPI.addData(rowData).then((message) => {
      TotalTasksDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export default totalTasksReducer;
