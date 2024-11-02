import { InWorkTasksDataAPI } from "../../api/api";
import { columns, filters, values } from "../../Components/Main/Tasks/service/TasksData";

const SET_DATA = "sodfu-court-db/inwork-tasks-reducer/SET_DATA";
const SET_VISIBLE_COLUMNS = "sodfu-court-db/inwork-tasks-reducer/SET_VISIBLE_COLUMNS";
const TOGGLE_IS_FETCHING = "sodfu-court-db/inwork-tasks-reducer/TOGGLE_IS_FETCHING";
const SET_SELECTED_TASKS = "sodfu-court-db/inwork-tasks-reducer/SET_SELECTED_TASKS";
const SET_TOTAL_IN_WORK_RECORDS =  "sodfu-court-db/inwork-tasks-reducer/SET_TOTAL_IN_WORK_RECORDS";

//TODO: columns и data должны быть []

let _columns = columns.filter(
  (column) =>
    column.field !== "hasNegative" &&
    column.field !== "docNegatives" &&
    column.field !== "analizedDateTime" &&
    column.field !== "analizeEmployeeComment"
);
let initialState = {
  columns: _columns,
  visibleColumns: _columns,
  data: [],
  totalRecords: 0,
  totalInWorkRecords: 0,
  filters: filters,
  values: values,
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
  selectedTasks: [],
};

const inWorkTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: state.columns,
        data: action.data.tasks,
        totalRecords: action.data.count,
        values: { ...action.data.values },
        filters: { ...state.filters },
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
      case SET_SELECTED_TASKS:
      return {
        ...state,
        selectedTasks: action.tasks,
      };
      case SET_TOTAL_IN_WORK_RECORDS:
      return {
        ...state,
        totalInWorkRecords: action.count,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
export const saveVisibleColumns = (visibleColumns) => ({ type: SET_VISIBLE_COLUMNS, visibleColumns });
export const setSelectedTasks = (tasks) => ({ type: SET_SELECTED_TASKS, tasks });
const setTotalInWorkRecords = (count) => ({ type: SET_TOTAL_IN_WORK_RECORDS, count});

export const requestData = (lazyState, employer) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await InWorkTasksDataAPI.getData(lazyState, employer)
    dispatch(toggleIsFetching(false));
    dispatch(setData(data));
  };
};

export const getTotalInWorkRecords = (employer) => {
  return async (dispatch) => {
    const data = await InWorkTasksDataAPI.getTotalInWorkRecords(employer);
    dispatch(setTotalInWorkRecords(data.count));
  };
};

export const updateData = (lazyState, employer, rowData, uniqueNumber) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await InWorkTasksDataAPI.updateData(rowData, uniqueNumber);
    const data = await InWorkTasksDataAPI.getData(lazyState, employer);
    dispatch(toggleIsFetching(false));
    dispatch(setData(data));
  };
};

export default inWorkTasksReducer;
