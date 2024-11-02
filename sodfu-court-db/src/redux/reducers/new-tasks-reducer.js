import { NewTasksDataAPI } from "../../api/api";
import { columns, filters, values } from "../../Components/Main/Tasks/service/TasksData";

const SET_DATA = "sodfu-court-db/new-tasks-reducer/SET_DATA";
const SET_VISIBLE_COLUMNS = "sodfu-court-db/new-tasks-reducer/SET_VISIBLE_COLUMNS";
const TOGGLE_IS_FETCHING = "sodfu-court-db/new-tasks-reducer/TOGGLE_IS_FETCHING";
// const SET_SELECTED_TASKS = "sodfu-court-db/new-tasks-reducer/SET_SELECTED_TASKS";
const SET_TOTAL_NEW_RECORDS =  "sodfu-court-db/new-tasks-reducer/SET_TOTAL_NEW_RECORDS";

let _columns = columns.filter(
  (column) =>
    column.field !== "hasNegative" &&
    column.field !== "docNegatives" &&
    column.field !== "submittedToWorkDateTime" &&
    column.field !== "analizedDateTime" &&
    column.field !== "analizeEmployeeName" &&
    column.field !== "analizeEmployeeComment"
);

//TODO: columns и data должны быть []
let initialState = {
  columns: _columns,
  visibleColumns: _columns,
  data: [],
  totalRecords: 0,
  totalNewRecords: 0,
  filters: filters,
  values: values,
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
  validationStatus: {},
  // selectedTasks: [],
};

const newTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: state.columns,
        data: action.data.newDocs,
        totalRecords: action.data.newCount,
        values: { ...action.data.values, taskStatus: ["Новая"] },
        filters: { ...state.filters },
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
      // case SET_SELECTED_TASKS:
      // return {
      //   ...state,
      //   selectedTasks: action.tasks,
      // };
      case SET_TOTAL_NEW_RECORDS:
      return {
        ...state,
        totalNewRecords: action.newCount,
      };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
export const saveVisibleColumns = (visibleColumns) => ({ type: SET_VISIBLE_COLUMNS, visibleColumns });
// export const setSelectedTasks = (tasks) => ({ type: SET_SELECTED_TASKS, tasks });
const setTotalNewRecords = (newCount) => ({ type: SET_TOTAL_NEW_RECORDS, newCount});

export const requestData = (lazyState) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await NewTasksDataAPI.getData(lazyState)
    dispatch(toggleIsFetching(false));
    dispatch(setData(data));
  };
};

export const getTotalNewRecords = () => {
  return async (dispatch) => {
    const data = await NewTasksDataAPI.getTotalNewRecords();
    dispatch(setTotalNewRecords(data.newCount));
  };
};

export const distributeToWork = (selectedTasks, lazyState, user) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await NewTasksDataAPI.distributeToWork(selectedTasks, user);
    const data = await NewTasksDataAPI.getData(lazyState)
    dispatch(toggleIsFetching(false));
    dispatch(setData(data));
  };
}




export const updateData = (data, rowData, rowId) => {
  return (dispatch) => {
    NewTasksDataAPI.updateData(rowData, rowId).then((message) => {
      NewTasksDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export const deleteData = (data, rowId) => {
  return (dispatch) => {
    NewTasksDataAPI.deleteData(rowId).then((message) => {
      NewTasksDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export const addData = (data, rowData) => {
  return (dispatch) => {
    NewTasksDataAPI.addData(rowData).then((message) => {
      NewTasksDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export default newTasksReducer;
