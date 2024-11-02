import { connect } from "react-redux";
import { compose } from "redux";
import { requestData, saveVisibleColumns, setSelectedTasks, updateData } from "../../../redux/reducers/inwork-tasks-reducer";
import { memo } from "react";
import InWorkTasksTable from "../Tables/InWorkTasksTable/InWorkTasksTable";
import { getTotalInWorkRecords } from "../../../redux/reducers/inwork-tasks-reducer";
import { getTotalNewRecords } from "../../../redux/reducers/new-tasks-reducer";

let mapStateToProps = (state) => {
  return {
    data: state.inworkTasks.data,
    columns: state.inworkTasks.columns,
    visibleColumns: state.inworkTasks.visibleColumns,
    filters: state.inworkTasks.filters,
    values: state.inworkTasks.values,
    isFetching: state.inworkTasks.isFetching,
    totalRecords: state.inworkTasks.totalRecords,
    totalInWorkRecords: state.inworkTasks.totalInWorkRecords,
    selectedTasks: state.inworkTasks.selectedTasks,
    theme: state.auth.theme,
    userAuth: state.auth,
  };
};

let mapDispatchToProps = {
    requestData,
    saveVisibleColumns,
    setSelectedTasks,
    getTotalInWorkRecords,
    updateData,
    getTotalNewRecords,
};

export default compose(
  memo,
  connect(mapStateToProps, mapDispatchToProps),
)(InWorkTasksTable);