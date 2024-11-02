import { CourtDocsDataAPI } from "../../api/api";
import { columns, filters, values } from "../../Components/Main/CourtDocs/service/CourtData";

const SET_DATA = "sodfu-court-db/court-docs-reducer/SET_DATA";
const SET_VISIBLE_COLUMNS = "sodfu-court-db/court-docs-reducer/SET_VISIBLE_COLUMNS";
const SET_UPLOAD_STATUS = "sodfu-court-db/court-docs-reducer/SET_UPLOAD_STATUS";
const TOGGLE_IS_FETCHING = "sodfu-court-db/court-docs-reducer/TOGGLE_IS_FETCHING";
const SET_TOTAL_RECORDS = "sodfu-court-db/court-docs-reducer/SET_TOTAL_RECORDS";

//TODO: columns и data должны быть []
let initialState = {
  columns: columns,
  visibleColumns: columns,
  data: [],
  totalRecords: 0,
  totalFilteredRecords: 0,
  filters: filters,
  values: values,
  uploadedStatus: false,
  name: "",
  message: "",
  isFetching: false,
  validationStatus: {}
};

const courtDocsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        columns: state.columns,
        data: action.data.docs,
        totalFilteredRecords: action.data.totalRecords,
        values: action.data.values,
        filters: {...state.filters},
      };
      case SET_UPLOAD_STATUS:
      return {
        ...state,
        uploadedStatus: action.uploadedStatus,
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
      case SET_TOTAL_RECORDS:
        return {
          ...state,
          totalRecords: action.totalRecords,
        };
    default:
      return state;
  }
};

const setData = (data) => ({ type: SET_DATA, data });
const setUploadStatus = (status) => ({ type: SET_UPLOAD_STATUS, uploadedStatus: status });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching: isFetching });
export const saveVisibleColumns = (visibleColumns) => ({ type: SET_VISIBLE_COLUMNS, visibleColumns });
const setTotalRecords = (totalRecords) => ({ type: SET_TOTAL_RECORDS, totalRecords});

const changeLogchangedFiledName = (data) => {
  //Переименование столбцов для таблицы изменений
  for (const doc of data.docs) {
    for (const log of doc.logs) {
      for (const col of columns) {
        log.changedFiled = log.changedFiled == col.field ? col.header : log.changedFiled;
      }
    }
  }
  return data
}

export const requestData = (data) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    CourtDocsDataAPI.getData(data).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setData(changeLogchangedFiledName(data)));
    });
  };
};

export const getTotalRecords = () => {
  return async (dispatch) => {
    const data = await CourtDocsDataAPI.getTotalRecords();
    dispatch(setTotalRecords(data.totalRecords));
  };
};

export const updateData = (data, rowData, rowId) => {
  return (dispatch) => {
    CourtDocsDataAPI.updateData(rowData, rowId).then((message) => {
      CourtDocsDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export const deleteData = (data, rowId) => {
  return (dispatch) => {
    CourtDocsDataAPI.deleteData(rowId).then((message) => {
      CourtDocsDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export const addData = (data, rowData) => {
  return (dispatch) => {
    CourtDocsDataAPI.addData(rowData).then((message) => {
      CourtDocsDataAPI.getData(data).then((data) => {
        dispatch(setData(data));
      });
    });
  };
};

export const uploadData = (uploadObj) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await CourtDocsDataAPI.uploadData(uploadObj);
    dispatch(toggleIsFetching(false));
      switch (data.resultCode) {
        case 0:
          dispatch(setUploadStatus(true));
          break;
      
        default:
          break;
      }
      const data2 = await CourtDocsDataAPI.getTotalRecords();
    dispatch(setTotalRecords(data2.totalRecords));
  };
};

export default courtDocsReducer;
